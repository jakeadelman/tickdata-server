import {
  newQuoteQuery,
  newTickQuery,
  newChatMsgQuery,
  newBitfinexTickQuery
} from './db_queries'
const fetch = require('node-fetch')
const dateFormat = require('dateformat')

var mod_ctype = require('ctype')
var parser = new mod_ctype.Parser({endian: 'big'})
parser.typedef('point_t', [{}])

var WebSocket = require('ws')
var ws = new WebSocket('wss://real.okex.com:10440/ws/v1')

ws.on('open', () => {
  ws.send("{'event':'addChannel','channel':'ok_sub_spot_bch_btc_ticker'}")
})
ws.on('message', dat => console.log(dat.toString()))

// const ws = bfx.ws();
// ws.on('error', (err) => console.log(err))
// ws.on('open', () => {
//     ws.subscribeTicker('BTCUSD')
// })

// ws.onTicker({ symbol: 'tBTCUSD' }, (tick) => {
//     let hour = new Date()
//     let datetime = dateFormat(hour, "yyyy-mm-dd hh:MM:ss.l");
//     let concatHour = dateFormat(hour, "yymmddhh");
//     console.log(tick)
//     const variables = {
//         timestamp: datetime,
//         hour: hour,
//         bidPrice: tick[0],
//         bidSize: tick[1],
//         askPrice: tick[2],
//         askSize: tick[3],
//         dailyChange: tick[4],
//         dailyChangePct: tick[5],
//         dailyVolume: tick[6],
//         dailyHigh: tick[7],
//         dailyLow: tick[8]

//     }
//     let query = newBitfinexTickQuery;
//     fetch("http://localhost:4000", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ query, variables })
//     })
//         .then((r) =>
//             console.log(
//                 r.json().then((r) => {
//                     const re = r;
//                     console.log(re);
//                 })
//             )
//         )
//         .catch((e) => console.log(e));

// })

// ws.open()
