const { Server } = require("socket.io");
const {
  stockMarket1,
  stockMarket2,
  otherValues,
} = require("../data/randomData");

const io = new Server();

const stockMarkets = ["stockMarket1", "stockMarket2"];

function joinStockMarket(socket, marketName) {
  stockMarkets
    .filter((market) => market !== marketName)
    .forEach((item) => socket.leave(item));

  socket.join(marketName);
}

function emitStockPrice(io, marketName, stockData, timer, interval) {
  setInterval(() => {
    if (timer < stockData.length) {
      io.to(marketName).emit("listen stock prices", stockData[timer]);
      timer++;
    } else {
      timer = 0;
    }
  }, interval);
}

io.on("connection", (socket) => {
  socket.on("join stock market 1", () => {
    joinStockMarket(socket, "stockMarket1");
  });

  socket.on("join stock market 2", () => {
    joinStockMarket(socket, "stockMarket2");
  });

  emitStockPrice(io, "stockMarket1", stockMarket1, 0, 1000);
  emitStockPrice(io, "stockMarket2", stockMarket2, 0, 1000);

  // Emit an event for broadcasting to connected user
  socket.on("stop listening all stock markets", () => {
    stockMarkets.forEach((market) => socket.leave(market));
  });

  let timer = 0;
  setInterval(() => {
    socket.emit("listen stock prices", otherValues[timer]);

    timer = timer + 1 >= otherValues.length ? 0 : timer + 1;
  }, 3000);

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

module.exports = io;
