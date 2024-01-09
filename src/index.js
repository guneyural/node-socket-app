const express = require("express");
const http = require("http");
const io = require("./socket");

const app = express();
const server = http.createServer(app);

io.attach(server);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server's running on port ${PORT}`);
});
