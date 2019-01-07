import {newTwitchMsg} from '../db_queries'

const tmi = require('tmi.js')
const fetch = require('node-fetch')
const dateFormat = require('dateformat')

// Define configuration options
const opts = {
  identity: {
    username: 'intelli_sentiment_bot',
    password: 'oauth:xh23z63wpddafj5d6hkdnlz0nccrhg'
  },
  channels: ['cryptotraderstv', 'cryptointelligencetv', 'cryptoworldnews']
}

// Create a client with our options
const client = new tmi.client(opts)

// Register our event handlers (defined below)
client.on('message', onMessageHandler)
client.on('connected', onConnectedHandler)

// Connect to Twitch:
client.connect()

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) {
    return
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim()

  // If the command is known, let's execute it
  if (commandName === '!sentiment') {
    client.say(target, `chat is bullish.`)
    console.log(`* Executed ${commandName} command`)
  } else if (commandName === '!sentiment_twitter') {
    client.say(target, `twitter is bullish. 64% percent bullish`)
  } else {
    let now = new Date()
    let isoDate = dateFormat(now, 'isoDateTime')
    let concatHour = dateFormat(now, 'yymmddHH')

    let newTwitchVars = {}
    if (context['emotes-raw']) {
      newTwitchVars = {
        timestamp: isoDate.toString(),
        hour: concatHour.toString(),
        text: commandName.toString(),
        emoji: context['emotes-raw'].toString(),
        channelName: 'cryptotraderstv'
      }
    } else {
      newTwitchVars = {
        timestamp: isoDate.toString(),
        hour: concatHour.toString(),
        text: commandName.toString(),
        emoji: 'null',
        channelName: 'cryptotraderstv'
      }
    }
    console.log(newTwitchVars)

    if (isUser(context) === true) {
      console.log('didnt add msg is bot user')
      return
    } else if (doesItInclude(commandName) === true) {
      console.log('didnt add msg is bot msg')
      return
    } else {
      return fetch('http://localhost:4000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: newTwitchMsg,
          variables: newTwitchVars
        })
      })
        .then(r => r.json())
        .then(r => console.log(r, ' added msg'))
        .catch(e => console.log(e))
    }
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`)
}

const doesItInclude = commandy => {
  let listy = ['$bitcoin', '$rain', '$tipcorn', '!corn', '$bal', '$help']
  return checkCheck(listy, commandy)
}

const isUser = context => {
  if (context.username === 'bitcornhub') {
    return true
  } else if (context.username === 'cryptotraderstv') {
    return true
  } else if (context.username === 'cttvbitcorn') {
    return true
  } else if (context.username === 'nightbot') {
    return true
  } else if (context.username === 'timkim') {
    return true
  } else {
    return false
  }
}

const checkCheck = (listy, commandy) => {
  commandy = commandy.toString()
  let yesOrNo
  for (let i = 0; i < listy.length; i++) {
    let val = listy[i]

    console.log(val)
    if (commandy.includes(val)) {
      yesOrNo = true
    } else {
      yesOrNo = false
    }
    if (i === listy.length) {
      return yesOrNo
    }
  }
}
