import * as twit from 'scrape-twitter'

const callstream = () => {
  const stream = new twit.TweetStream('bitcoin', 'top' | 'latest', {count: 10})

  //return stream data
  return stream.on('data', data => {
    console.log(data)
  })
}

setInterval(callstream, 10000)
