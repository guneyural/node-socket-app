const { Server } = require("socket.io");
const {
  stockMarket1,
  stockMarket2,
  otherValues,
} = require("../data/randomData");

const io = new Server();

const stockMarkets = ["stockMarket1", "stockMarket2"];

io.on("connection", (socket) => {
  socket.on("join stock market 1", () => {
    stockMarkets
      .filter((market) => market != "stockMarket1")
      .forEach((item) => socket.leave(item));

    socket.join("stockMarket1");
  });

  socket.on("join stock market 2", () => {
    stockMarkets
      .filter((market) => market != "stockMarket2")
      .forEach((item) => socket.leave(item));

    socket.join("stockMarket2");
  });

  let stockMarket1Timer = 0;
  setInterval(() => {
    if (stockMarket1Timer < stockMarket1.length) {
      io.to("stockMarket1").emit(
        "listen stock prices",
        stockMarket1[stockMarket1Timer]
      );

      stockMarket1Timer++;
    } else {
      stockMarket1Timer = 0;
    }
  }, 1000);

  let stockMarket2Timer = 0;

  setInterval(() => {
    if (stockMarket2Timer < stockMarket2.length) {
      io.to("stockMarket2").emit(
        "listen stock prices",
        stockMarket2[stockMarket2Timer]
      );

      stockMarket2Timer++;
    } else {
      stockMarket2Timer = 0;
    }
  }, 1000);

  // Emit an event for broadcasting to connected user
  socket.on("stop listening all stock markets", () => {
    stockMarkets.forEach((market) => socket.leave(market));
  });

  let timer = 0;
  setInterval(() => {
    console.log({ timer });
    socket.emit("listen stock prices", otherValues[timer]);

    if (timer + 1 >= otherValues.length) {
      timer = 0;
    } else {
      timer += 1;
    }
  }, 1000);

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

module.exports = io;
