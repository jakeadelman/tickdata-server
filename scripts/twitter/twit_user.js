import * as twit from 'scrape-twitter'
import {searchTweet, newTweetQuery} from '../db_queries'

const fetch = require('node-fetch')

let word = 'bitcoin'
let me = 'jasond85658576'

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
    // format hour
    let concatHour = dat.time
    let str1 = concatHour.substring(2, 4)
    let str2 = concatHour.substring(5, 7)
    let str3 = concatHour.substring(8, 10)
    let str4 = concatHour.substring(11, 13)
    concatHour = str1 + str2 + str3 + str4
    const variables = {
      timestamp: dat.time,
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
      favoriteCount: parseInt(dat.favoriteCount)
    }

    let searchTweetQuery = searchTweet
    let searchVars = {
      hour: concatHour,
      tweetId: dat.id
    }

    //send to db
    fetch('http://localhost:4000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({searchTweetQuery, searchVars})
    })
      .then(r => {
        console.log(r.headers, 'THIS HEADERS')
        // get status
        let re = JSON.parse(JSON.stringify(r))
        console.log(re)
        re.json()
          .then(r => console.log(r))
          .catch(err => console.log(err))

        // hola
        let status = r.status
        console.log(status)
        //if status is 500 add tweet to db | else pass
        if (status === 500) {
          console.log('adding ', variables.tweetId, ' to db..')
          //send to db
          fetch('http://localhost:4000', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({query, variables})
          })
            .then(r => {
              r.json().then(r => {
                const re = r
                console.log(re)
              })
            })
            .catch(e => console.log(e))
        } else {
          console.log('already added ', variables.tweetId)
          return null
        }
      })
      .catch(e => console.log(e))
  })
}

// setInterval(wordStream(word), 300000)
setInterval(listStream, 3000)
