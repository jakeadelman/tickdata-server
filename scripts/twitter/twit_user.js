import * as twit from 'scrape-twitter'
import {searchT, newTweetQuery, updateTweet} from '../db_queries'
const sentiment140 = require('sentiment140')
const dateFormat = require('dateformat')

let senti = new sentiment140({
  auth: 'cryptobotting25@gmail.com'
})

const fetch = require('node-fetch')

const listStream = () => {
  // create stream
  const stream = new twit.ListStream('jasond85658576', 'CT', {count: 20})
  stream.on('error', err => console.log(err))

  // test return
  stream.on('data', data => {
    let dat = JSON.stringify(data)
    dat = JSON.parse(dat)
    let query = newTweetQuery
    // format userMentions
    let userMentions = JSON.stringify(dat.userMentions)
    let userMentionsParse = JSON.parse(userMentions)
    if (userMentionsParse[0]) {
      userMentions = userMentions.toString()
    } else {
      userMentions = 'null'
    }
    // format hashtags
    let hashtags = JSON.stringify(dat.hashtags)
    let hashtagsParse = JSON.parse(hashtags)
    if (hashtagsParse[0]) {
      hashtags = hashtags.toString()
    } else {
      hashtags = 'null'
    }
    // format imgs
    let images = JSON.stringify(dat.images)
    let imagesParse = JSON.parse(images)
    if (imagesParse[0]) {
      images = images.toString()
    } else {
      images = 'null'
    }
    // format urls
    let urls = JSON.stringify(dat.urls)
    let urlsParse = JSON.parse(urls)
    if (urlsParse[0]) {
      urls = urls.toString()
    } else {
      urls = 'null'
    }

    //get current time and format to hour
    let now = new Date()
    let currHour = dateFormat(now, 'yymmddHH')

    // format hour
    let concatHour = dat.time
    let str1 = concatHour.substring(2, 4)
    let str2 = concatHour.substring(5, 7)
    let str3 = concatHour.substring(8, 10)
    let str4 = concatHour.substring(11, 13)
    concatHour = str1 + str2 + str3 + str4
    const variables = {
      timestamp: dat.time,
      currHour: currHour,
      hour: concatHour,
      screenName: dat.screenName,
      tweetId: dat.id,
      isRetweet: dat.isRetweet,
      isPinned: dat.isPinned,
      isReplyTo: dat.isReplyTo,
      text: dat.text,
      userMentions: userMentions,
      hashtags: hashtags,
      images: images,
      urls: urls,
      replyCount: parseInt(dat.replyCount),
      retweetCount: parseInt(dat.retweetCount),
      favoriteCount: parseInt(dat.favoriteCount),
      polarity: 2,
      searchTerm: 'CT'
    }

    let searchTweetQuery = searchT
    let searchTweetVars = {
      hour: concatHour,
      tweetId: dat.id
    }

    let updateTweetQuery = updateTweet
    let updateTweetVars = {
      hour: concatHour,
      tweetId: dat.id,
      replyCount: parseInt(dat.replyCount),
      retweetCount: parseInt(dat.retweetCount),
      favoriteCount: parseInt(dat.favoriteCount)
    }

    ///send to db
    return fetch('http://localhost:4000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: searchTweetQuery,
        variables: searchTweetVars
      })
    })
      .then(r => r.json())
      .then(r => {
        let dati = JSON.parse(JSON.stringify(r.data))
        dati = dati.tweet

        if (dati[0]) {
          //send to db
          fetch('http://localhost:4000', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query: updateTweetQuery,
              variables: updateTweetVars
            })
          })
            .then(r => {
              return r
                .json()
                .then(r => r)
                .catch(err => console.log(err))
            })
            .catch(e => console.log(e))
        } else {
          let sentiVars = {
            text: variables.text,
            id: variables.tweetId,
            query: 'crypto'
          }
          let arry = []
          arry.push(sentiVars)
          let sentiDat = {}
          sentiDat['data'] = arry

          setTimeout(async function() {
            try {
              let r = await senti.sentiment(sentiDat, function(error, result) {
                if (result) {
                  console.log(result[0].id, variables.tweetId)

                  let newVars = variables
                  newVars['polarity'] = result[0].polarity

                  //send to db
                  fetch('http://localhost:4000', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({query: query, variables: newVars})
                  })
                    .then(r => {
                      r.json()
                        .then(r => console.log(r))
                        .catch(e => console.log(r))
                    })
                    .catch(e => console.log(e))
                } else if (error) {
                  return
                }
              })
            } catch (err) {
              return
            }
          }, 1000)
        }
      })
      .catch(e => console.log(e))
  })
}

// setInterval(wordStream(word), 300000)
setInterval(listStream, 300000)
