const { Server } = require("socket.io");

const io = new Server();

io.on("connection", (socket) => {
  console.log(socket);
});

module.exports = io;
