import * as twit from 'scrape-twitter'

const fetch = require('node-fetch')

const searchTweet = `
query tweet(
  $hour: String!,
  $tweetId: String!
  { 
    tweet(
      hour: $hour,
      tweetId: $tweetId
    ){
      hour
      tweetId
    }
}
`

const searchT = `
   query tweets($hour: String!, $tweetId: String!){
    tweet(hour: $hour, tweetId: $tweetId){
      hour
      tweetId
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
  body: JSON.stringify({query: searchT, variables: searchVars})
})
  .then(
    r => r.json()
    // console.log(r)
    // console.log(r.status, 'THIS STATUS')
    // let re = r
    // re.json()
    //   .then(r => console.log(r))
    //   .catch(err => console.log(err))
  )
  .then(r => {
    return console.log(r.data)
  })
  .catch(err => console.log(err))
