// 3rd party imports
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");

// imports
const config = require("./config");
const TagModel = require("./models/tag.model");
const UrlModel = require("./models/url.model");
const UserModel = require("./models/user.model");

// create app, server and socket.io
const app = express();
const server = http.createServer(app);
const sio = require("socket.io").listen(server);

// config mongoose
mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true }, (err) => {
  if (err) console.error(err); return;
  console.log("Successfully conntected to MongoDB Server!");
});

// config app
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// create helpers
const CryptoHelper = require("./logic/helpers/crypto.helper")(config.pwSecret);
const SocketHelper = require("./logic/helpers/socket.helper")(sio);

// create middleware
const authMiddleware = require("./logic/middleware/auth.middleware")(config.tokenSecret);

// const repositories
const authRepository = require("./logic/repositories/auth.repository")(UserModel, config, CryptoHelper);
const userRepository = require("./logic/repositories/user.repository")(UserModel);

// create routes
const authRoute = require("./routes/auth.route")(express, authRepository);
const userRoute = require("./routes/user.route")(express, userRepository);

// set routes
app.use("/api/v1", authRoute);
app.use("/api/v1/user", userRoute);

// socket.io connection
sio.on("connection", (socket) => {
  console.log(`New Client has connected ${socket.id}`);
  socket.on("disconnect", () => console.log("A Client has disconnected"));
});

// start the server
server.listen(config.port, () => console.log(`Server is running under PORT ${config.port}`));
