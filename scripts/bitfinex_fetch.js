import {
  newQuoteQuery,
  newTickQuery,
  newChatMsgQuery,
  newBitfinexTickQuery
} from './db_queries'
const fetch = require('node-fetch')
const dateFormat = require('dateformat')

const BFX = require('bitfinex-api-node')
const bfx = new BFX({
  ws: {
    autoReconnect: true
  }
})

const ws = bfx.ws()
ws.on('error', err => console.log(err))
ws.on('open', () => {
  ws.subscribeTicker('BTCUSD')
})

ws.onTicker({symbol: 'tBTCUSD'}, tick => {
  let hour = new Date()
  let datetime = dateFormat(hour, 'yyyy-mm-dd hh:MM:ss.l')
  let concatHour = dateFormat(hour, 'yymmddhh')
  console.log(tick)
  const variables = {
    timestamp: datetime,
    hour: hour,
    bidPrice: tick[0],
    bidSize: tick[1],
    askPrice: tick[2],
    askSize: tick[3],
    dailyChange: tick[4],
    dailyChangePct: tick[5],
    dailyVolume: tick[6],
    dailyHigh: tick[7],
    dailyLow: tick[8]
  }
  let query = newBitfinexTickQuery
  fetch('http://localhost:4000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({query, variables})
  })
    .then(r =>
      console.log(
        r.json().then(r => {
          const re = r
          console.log(re)
        })
      )
    )
    .catch(e => console.log(e))
})

ws.open()

// const fetch = require("node-fetch");
// const dateFormat = require("dateformat");

// ws.on('message', async (res) => await console.log(res))

// ws.on("message", (data) => {
//     let dat = JSON.parse(data);
//     if (dat.table === "chat") {
//         let chat = dat.data;
//         console.log(chat)

//         chat.map((res) => {
//             let channelID = parseInt(res.channelID);
//             let fromBot = res.fromBot;
//             let message = res.message;
//             let hour = new Date();
//             let datetime = dateFormat(hour, "yyyy-mm-dd hh:MM:ss.l");
//             let concatHour = dateFormat(hour, "yymmddhh");

//             const variables = {
//                 channelID: channelID,
//                 hour: concatHour,
//                 fromBot: res.fromBot,
//                 message: res.message

//             };
//             let query = newChatMsgQuery;

//             fetch("http://localhost:4000", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ query, variables })
//             })
//                 .then((r) =>
//                     console.log(
//                         r.json().then((r) => {
//                             const re = r;
//                             console.log(re);
//                         })
//                     )
//                 )
//                 .catch((e) => console.log(e));
//         });
//     } else {
//         console.log('null')
//     }
// });
