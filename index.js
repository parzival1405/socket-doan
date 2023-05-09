const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const SocketServer = require("./SocketServer");
const app = express();
const email = require("./src/routes")
require("dotenv").config();

app.use(cors({ origin: true, credentials: true,preflightContinue: false }));
app.use(express.json());

app.use("/api/sendEmail", email);

const server = app.listen(process.env.PORT || 5000, () =>
  console.log("server runing on port 5000")
);


const io = socketio(server, {
  cors: {
    origin: "*",
    Credential: true,
  },
});

io.on("connection", (socket) => {
  SocketServer(socket,socket.handshake.query);
});
