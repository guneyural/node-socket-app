const express = require("express");
const http = require("http");
const io = require("./socket");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
io.attach(server);

app.use(cors());

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server's running on port ${PORT}`);
});
