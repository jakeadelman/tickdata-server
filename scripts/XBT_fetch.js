import {newQuoteQuery, newTickQuery} from './db_queries'

var WebSocket = require('ws')
var ws = new WebSocket(
  'wss://www.bitmex.com/realtime?subscribe=trade,quote,orderBookL2_25,funding,connected,chat'
)
const fetch = require('node-fetch')
const dateFormat = require('dateformat')

ws.on('message', data => {
  let dat = JSON.parse(data)
  if (dat.table === 'quote') {
    let quote = dat.data
    quote.map(res => {
      let bidS = parseInt(res.bidSize)
      let bidP = parseFloat(res.bidPrice)
      let askS = parseInt(res.askSize)
      let askP = parseFloat(res.askPrice)

      let datetime = dateFormat(res.timestamp, "UTC:yyyy-mm-dd'T'HH:MM:ss.l'Z'")
      let concatHour = datetime.toString()
      let str1 = concatHour.substring(2, 4)
      let str2 = concatHour.substring(5, 7)
      let str3 = concatHour.substring(8, 10)
      let str4 = concatHour.substring(11, 13)

      concatHour = str1 + str2 + str3 + str4

      const variables = {
        timestamp: datetime,
        symbol: res.symbol,
        hour: concatHour,
        bidSize: bidS,
        bidPrice: bidP,
        askPrice: askP,
        askSize: askS
      }
      let query = newQuoteQuery

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
  } else if (dat.table === 'trade') {
    //send to db
    let trade = dat.data
    trade.map(trade => {
      let size = parseInt(trade.size)
      let price = parseFloat(trade.price)

      let datetime = dateFormat(
        trade.timestamp,
        "UTC:yyyy-mm-dd'T'HH:MM:ss.l'Z'"
      )
      let concatHour = datetime.toString()
      let str1 = concatHour.substring(2, 4)
      let str2 = concatHour.substring(5, 7)
      let str3 = concatHour.substring(8, 10)
      let str4 = concatHour.substring(11, 13)

      concatHour = str1 + str2 + str3 + str4

      const variables = {
        timestamp: datetime,
        hour: concatHour,
        symbol: trade.symbol,
        side: trade.side,
        size: size,
        price: price,
        tickDirection: trade.tickDirection,
        trdMatchID: trade.trdMatchID
      }
      let query = newTickQuery
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
  }
})
