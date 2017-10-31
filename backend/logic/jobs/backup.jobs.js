const nodemailer = require("nodemailer");
const { writeFile, readFile, unlink } = require("fs");
const { promisify } = require('util');

const writeFileAsync = promisify(writeFile);
const readFileAsync = promisify(readFile);
const unlinkAsync = promisify(unlink);

const schedule = require("node-schedule");

module.exports = (Config, UrlRepository, TagRepository) => {

  async function _fetchData () {

    const urlData = await UrlRepository.getAll();
    const tagData = await TagRepository.getAll();
    const combinedData = { urlData, tagData };

    const filePath = "./tmp";
    const fileName = "backup_" + Date.now() + ".json";
    const combinedFilePath = `${filePath}/${fileName}`;

    await writeFileAsync(combinedFilePath, JSON.stringify(combinedData));
    const fileData = await readFileAsync(combinedFilePath, "utf8");

    return { combinedFilePath, fileName, fileData };
  }

  async function _sendMail (options) {
    const transporter = nodemailer.createTransport({
      host: Config.emailProviderHost,
      port: Config.emailProviderPort,
      secure: Config.emailProviderUseSsl,
      auth: {
        user: Config.emailAddressFrom,
        pass: Config.emailPasswordFrom
      }
    });

    const message = {
      from: Config.emailAddressFrom,
      to: Config.emailAddressTo,
      subject: "Yeah! URLs Backup from " + new Date(),
      attachments: [{
        filename: options.fileName,
        content: options.fileData
      }]
    };

    return await transporter.sendMail(message);
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
