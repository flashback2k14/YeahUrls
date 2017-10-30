module.exports = {
  isDebug: process.env.ISDEBUG || true,
  pwSecret: process.env.PWSECRET || "34585tjkdfb4iuo538tuguhjfnd8435oiptkjg",
  tokenSecret: process.env.TOKENSECRET || "'*!?yeah1urls2backend3?!*'",
  tokenExpires: process.env.TOKENEXPIRES || "1d",
  tokenIssuer: process.env.TOKENISSUER || "yeah-urls-backend",
  database: process.env.DB || "mongodb://127.0.0.1:27017/yeahurls",
  port: process.env.PORT || "6006",
  scheduleJobHour: process.env.SCHEDULE_JOB_HOUR || "18",
  scheduleJobMinute: process.env.SCHEDULE_JOB_MINUTE || "00",
  emailProviderHost: process.env.EMAIL_PROVIDER_HOST || "",
  emailProviderPort: process.env.EMAIL_PROVIDER_PORT || "",
  emailProviderUseSsl: process.env.EMAIL_PROVIDER_USE_SSL || true,
  emailAddressFrom: process.env.EMAIL_ADDRESS_FROM || "",
  emailPasswordFrom: process.env.EMAIL_PASSWORD_FROM || "",
  emailAddressTo: process.env.EMAIL_ADDRESS_TO || ""
};
