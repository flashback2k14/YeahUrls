// 3rd party imports
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const http = require("http");
const mongoose = require("mongoose");

// imports
const Config = require("./config");
const TagModel = require("./models/tag.model");
const UrlModel = require("./models/url.model");
const UserModel = require("./models/user.model");

// create app, server and socket.io
const app = express();
const server = http.createServer(app);
const sio = require("socket.io").listen(server);

// config mongoose
mongoose.Promise = global.Promise;
mongoose.connect(Config.database, { useMongoClient: true }, (err) => {
  if (err) console.error(err);
  else console.log(`MONGODB SERVER: successfully connected under ${Config.database}`);
});

// config app
app.use(helmet({
  dnsPrefetchControl: { allow: true },
  frameguard: { action: "deny" }
}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// create helpers
const CryptoHelper = require("./logic/helpers/crypto.helper")(Config.pwSecret);
const SocketHelper = require("./logic/helpers/socket.helper")(sio);

// create middleware
const authMiddleware = require("./logic/middleware/auth.middleware")(Config.tokenSecret);

// const repositories
const authRepository = require("./logic/repositories/auth.repository")(UserModel, Config, CryptoHelper);
const userRepository = require("./logic/repositories/user.repository")(UserModel);
const tagRepository = require("./logic/repositories/tag.repository")(TagModel, SocketHelper);
const urlRepository = require("./logic/repositories/url.repository")(UrlModel, TagModel, UserModel, SocketHelper);

// create routes
const authRoute = require("./routes/auth.route")(express, authRepository);
const userRoute = require("./routes/user.route")(express, userRepository);
const tagRoute = require("./routes/tag.route")(express, tagRepository);
const urlRoute = require("./routes/url.route")(express, urlRepository);

// set routes
app.use("/api/v1", authRoute);
app.use("/api/v1/user", authMiddleware.checkAuthState, userRoute);
app.use("/api/v1/tag", authMiddleware.checkAuthState, tagRoute);
app.use("/api/v1/url", authMiddleware.checkAuthState, urlRoute);

// create backup job
try {
  const backupJob = require("./logic/jobs/backup.jobs")(Config, urlRepository, tagRepository);
  backupJob.create();
} catch (error) {
  console.error(error);
  process.exit(1);
}

// socket.io connection
sio.on("connection", (socket) => {
  console.log(`SOCKET.IO: new client has connected ${socket.id}`);
  socket.on("disconnect", () => console.log("SOCKET.IO: a client has disconnected"));
});

// start the server
server.listen(Config.port, () => console.log(`SERVER: is running under PORT ${Config.port}`));
