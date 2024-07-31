const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const port = 3000;

const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

let roomIdGlobal, imgURLGlobal;

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("userJoined", (data) => {
    const { name, roomId, userId, host, presenter } = data;
    roomIdGlobal = roomId;
    socket.join(roomId);
    socket.emit("userIsJoined", { success: true });
    socket.broadcast.to(roomId).emit("whiteBoardDataResponse", {
      imgURL: imgURLGlobal,
    })
    console.log(`${name} joined room ${roomId}`);
  });

  socket.on("stageImage", (data) => {
    imgURLGlobal = data;
    socket.broadcast.to(roomIdGlobal).emit("whiteBoardDataResponse", {
      imgURL: imgURLGlobal,
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
