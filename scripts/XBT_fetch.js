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
      let hour = new Date(res.timestamp)
      let datetime = dateFormat(hour, 'yyyy-mm-dd hh:MM:ss.l')
      let concatHour = dateFormat(hour, 'yymmddhh')

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
      let hour = new Date(trade.timestamp)
      let datetime = dateFormat(hour, 'yyyy-mm-dd hh:MM:ss.l')
      let concatHour = dateFormat(hour, 'yymmddhh')

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
