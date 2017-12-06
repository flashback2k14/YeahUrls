const schedule = require("node-schedule");
const { writeFile, readFile, unlink } = require("fs");
const { promisify } = require('util');

const writeFileAsync = promisify(writeFile);
const readFileAsync = promisify(readFile);
const unlinkAsync = promisify(unlink);

module.exports = (Config, UrlRepository, TagRepository) => {

  async function _fetchData () {

    const urlData = await UrlRepository.getAll();
    const tagData = await TagRepository.getAll();
    const combinedData = { urlData, tagData };

    const filePath = "./tmp";
    const fileName = "backup_" + Date.now() + ".json";
    const combinedFilePath = `${filePath}/${fileName}`;

    await writeFileAsync(combinedFilePath, JSON.stringify(combinedData));

    return { combinedFilePath };
  }

  async function _sendMail (options) {

    const mailGun = require("mailgun-js")({
      apiKey: Config.mailGunApiKey,
      domain: Config.mailGunDomain
    });

    const message = {
      from: Config.emailAddressFrom,
      to: Config.emailAddressTo,
      subject: "Yeah! URLs Backup from " + new Date(),
      text: "This is an auto generated Backup file from the Database.",
      attachment: options.combinedFilePath
    };

    return await mailGun.messages().send(message);
  }

  async function create () {

    console.log("SCHEDULE: create backup job");
    console.log("SCHEDULE: current date: " + new Date());
    console.log("SCHEDULE: backup job should run at hour: " + Config.scheduleJobHour);
    console.log("SCHEDULE: backup job should run at minute: " + Config.scheduleJobMinute);    

    const scheduleRule = new schedule.RecurrenceRule();
    scheduleRule.dayOfWeek = new schedule.Range(0, 6);
    scheduleRule.hour = Number(Config.scheduleJobHour);
    scheduleRule.minute = Number(Config.scheduleJobMinute);

    const job = schedule.scheduleJob("Backup", scheduleRule, async () => {
      console.log("SCHEDULE: begin execute backup job");
      const options = await this._fetchData();
      await this._sendMail(options);
      await unlinkAsync(options.combinedFilePath);
      console.log("SCHEDULE: end execute backup job");
    });
  }

  return {
    _fetchData,
    _sendMail,
    create
  }
}
