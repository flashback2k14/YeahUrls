module.exports = {
  isDebug: process.env.ISDEBUG || true,
  secret: process.env.SECRET || "'*!?yeah1urls2backend3?!*'",
  pwSecret: process.env.PWSECRET || "34585tjkdfb4iuo538tuguhjfnd8435oiptkjg",
  database: process.env.DB || "mongodb://127.0.0.1:27017/yeahurls",
  port: process.env.PORT || "6006"
};
