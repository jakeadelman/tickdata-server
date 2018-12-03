const fetch = require("node-fetch");
const dateFormat = require("dateformat");

const BitMEXClient = require("bitmex-realtime-api");
const client = new BitMEXClient({ testnet: false });
const dateFormat = require("dateformat");

client.addStream("XBTUSD", "quote", async (data, symbol, tableName) => {
  if (!data.length) return;
  const quote = await data[data.length - 1]; // the last data element is the newest quote
  // Do something with the quote (.bidPrice, .bidSize, .askPrice, .askSize)

  if (quote) {
    let bidSize = parseInt(quote.bidSize);
    let bidPrice = parseFloat(quote.bidPrice);
    let askSize = parseInt(quote.askSize);
    let askPrice = parseFloat(quote.askPrice);
    let hour = new Date(quote.timestamp);
    let datetime = dateFormat(hour, "yyyy-mm-dd hh:MM:ss.l");
    let concatHour = dateFormat(hour, "yymmddhh");

    const variables = {
      timestamp: datetime,
      symbol: quote.symbol,
      hour: concatHour,
      bidSize: bidSize,
      bidPrice: bidPrice,
      askPrice: askPrice,
      askSize: askSize
    };

    

    fetch("http://localhost:4000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query, variables })
    })
      .then((r) =>
        console.log(
          r.json().then((r) => {
            const re = r;
            console.log(re);
          })
        )
      )
      .catch((e) => console.log(e));
  } else {
    return;
  }
});

client.addStream("", "trade", async (data, symbol, tableName) => {
  if (!data.length) return;
  const trade = await data[data.length - 1]; // the last data element is the newest quote
  // Do something with the quote (.bidPrice, .bidSize, .askPrice, .askSize)

  if (trade) {
    let size = parseInt(trade.size);
    let price = parseFloat(trade.price);
    let hour = new Date(trade.timestamp);
    let datetime = dateFormat(hour, "yyyy-mm-dd hh:MM:ss.l");
    let concatHour = dateFormat(hour, "yymmddhh");

    const variables = {
      timestamp: datetime,
      hour: concatHour,
      symbol: trade.symbol,
      side: trade.side,
      size: size,
      price: price,
      tickDirection: trade.tickDirection,
      trdMatchID: trade.trdMatchID
    };

    

    fetch("http://localhost:4000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query, variables })
    })
      .then((r) =>
        console.log(
          r.json().then((r) => {
            const re = r;
            console.log(re);
          })
        )
      )
      .catch((e) => console.log(e));
  } else {
    return;
  }
});
