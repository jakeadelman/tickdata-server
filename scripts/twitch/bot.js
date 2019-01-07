import {newTwitchMsg} from '../db_queries'

const tmi = require('tmi.js')
const fetch = require('node-fetch')
const dateFormat = require('dateformat')

// Define configuration options
const opts = {
  identity: {
    username: 'cttv_sentibot',
    password: 'oauth:k9jlndq8ybgdtyway7h0cfdpggv7zf'
  },
  channels: ['cryptotraderstv']
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

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`)
}

const doesItInclude = async commandy => {
  let listy = ['$bitcoin', '$rain', '$tipcorn', '!corn', '$bal']
  return await checkCheck(listy, commandy)
}

const isUser = context => {
  if (context.username === 'bitcornhub') {
    return true
  } else if (context.username === 'cryptotraderstv') {
    return true
  } else if (context.username === 'cttvbitcorn') {
    return true
  } else if (context.username === 'nightbot') {
  } else {
    return false
  }
}

const checkCheck = (listy, commandy) => {
  let yesOrNo = true
  for (let i = 0; i < listy.length; i++) {
    if (commandy.includes(listy[i])) {
      yesOrNo = true
    } else {
      yesOrNo = false
    }
  }
  return yesOrNo
}
