// 3rd party imports
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
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
  else console.log("Successfully conntected to MongoDB Server!");
});

// config app
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
const tagRepository = require("./logic/repositories/tag.repository")(TagModel);
const urlRepository = require("./logic/repositories/url.repository")(UrlModel, TagModel, UserModel);

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

// socket.io connection
sio.on("connection", (socket) => {
  console.log(`New Client has connected ${socket.id}`);
  socket.on("disconnect", () => console.log("A Client has disconnected"));
});

// start the server
server.listen(Config.port, () => console.log(`Server is running under PORT ${Config.port}`));
