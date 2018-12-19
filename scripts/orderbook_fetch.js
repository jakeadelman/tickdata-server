import {newQuoteQuery, newTickQuery} from './db_queries'

var WebSocket = require('ws')
var ws = new WebSocket(
  'wss://www.bitmex.com/realtime?subscribe=trade,quote,orderBookL2_25,funding,connected,chat'
)
const fetch = require('node-fetch')
const dateFormat = require('dateformat')

ws.on('message', data => {
  let dat = JSON.parse(data)
  if (dat.table === 'orderBookL2_25') {
    //send to db
    console.log(dat)
    console.log('^^^ orderbook data ^^^')
  }
})
