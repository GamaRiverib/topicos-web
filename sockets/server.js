const express = require("express");
const socket = require("socket.io");

const users = [];

const PORT = process.env.PORT || 3000;
const app = express();

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(express.static("public"));

const io = socket(server);

io.on("connection", (socket) => {
  console.log("New client connection");

  socket.on("user:connected", (nickname) => {
    const i = users.findIndex(u => u === nickname);
    if (i >= 0) {
      console.log("User found", nickname);
      socket.send("error");
      return;
    }

    socket.userId = nickname;
    users.push(nickname);
    io.emit("user:connected", [...users]);
  });

  socket.on("disconnect", () => {
    const i = users.findIndex(u => u === socket.userId);
    if (i >= 0) {
      const user = users.splice(i, 1);
      io.emit("user:disconnected", { user });
    }
  });

  socket.on("user:message", (msg) => {
    io.emit("user:message", msg);
  });
  
  socket.on("user:typing", (data) => {
    socket.broadcast.emit("user:typing", data);
  });

});
