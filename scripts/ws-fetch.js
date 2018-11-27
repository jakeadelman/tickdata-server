const fetch = require("node-fetch");

const BitMEXClient = require("bitmex-realtime-api");
const client = new BitMEXClient({ testnet: false });

client.addStream("XBTUSD", "quote", async (data, symbol, tableName) => {
  if (!data.length) return;
  const quote = await data[data.length - 1]; // the last data element is the newest quote
  // Do something with the quote (.bidPrice, .bidSize, .askPrice, .askSize)

  if (quote) {
    let bidSize = parseInt(quote.bidSize);
    let bidPrice = parseFloat(quote.bidPrice);
    let askSize = parseInt(quote.askSize);
    let askPrice = parseFloat(quote.askPrice);

    const variables = {
      timestamp: quote.timestamp,
      symbol: quote.symbol,
      bidSize: bidSize,
      bidPrice: bidPrice,
      askPrice: askPrice,
      askSize: askSize
    };

    const query = `
      mutation newquote(
        $timestamp: String!
        $symbol: String!
        $bidSize: Int!
        $bidPrice: Float!
        $askPrice: Float!
        $askSize: Int!
      ) {
        newquote(
          timestamp: $timestamp
          symbol: $symbol
          bidSize: $bidSize
          bidPrice: $bidPrice
          askPrice: $askPrice
          askSize: $askSize
        ) 
      }
    `;

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

client.addStream("XBTUSD", "trade", async (data, symbol, tableName) => {
  if (!data.length) return;
  const trade = await data[data.length - 1]; // the last data element is the newest quote
  // Do something with the quote (.bidPrice, .bidSize, .askPrice, .askSize)

  if (trade) {
    let size = parseInt(trade.size);
    let price = parseFloat(trade.price);

    const variables = {
      timestamp: trade.timestamp,
      symbol: trade.symbol,
      side: trade.side,
      size: size,
      price: price,
      tickDirection: trade.tickDirection,
      trdMatchID: trade.trdMatchID
    };

    const query = `
    mutation newtick(
      $timestamp: String!,
      $symbol: String!,
      $side: String!,
      $size: Int!,
      $price: Float!,
      $tickDirection: String!,
      $trdMatchID: String!
    ) {
      newtick(
        timestamp: $timestamp,
        symbol: $symbol,
        side: $side,
        size: $size,
        price: $price,
        tickDirection: $tickDirection,
        trdMatchID: $trdMatchID
      )
      }
    `;

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
