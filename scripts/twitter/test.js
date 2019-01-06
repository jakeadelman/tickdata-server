import * as twit from 'scrape-twitter'
import {searchTweet, newTweetQuery} from '../db_queries'

const fetch = require('node-fetch')

let word = 'bitcoin'
let me = 'jasond85658576'

const searchTweet = `
query tweet(
  $hour: String!,
  $tweetId: String!
  { 
    tweets(
      hour: $hour,
      tweetId: $tweetId
    ){
      hour
    }
}
`
const searchVars = {
  hour: '19010520',
  tweetId: '1081655101247442946'
}

// test fetch
fetch('http://localhost:4000', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({searchTweet, searchVars})
})
  .then(r => {
    console.log(r)
    console.log(r.status, 'THIS STATUS')
  })
  .catch(err => console.log(err))
