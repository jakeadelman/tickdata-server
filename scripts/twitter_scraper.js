import * as twit from 'scrape-twitter'
import {consoleTestResultHandler} from 'tslint/lib/test'
const fetch = require('node-fetch')
const dateFormat = require('dateformat')

let word = 'bitcoin'

const callstream = () => {
  // create stream
  const stream = new twit.TweetStream('bitcoin', 'top' | 'latest', {count: 10})

  // test return
  return stream.on('data', data => {
    let dat = JSON.stringify(data)
    dat = JSON.parse(dat)
    console.log(dat)

    //usermentions
    let userMentions = JSON.stringify(dat.userMentions)
    let userMentionsParse = JSON.parse(userMentions)
    if (userMentionsParse[0]) {
      userMentions = userMentions.toString()
    } else {
      userMentions = 'null'
    }
    //hashtags
    let hashtags = JSON.stringify(dat.hashtags)
    let hashtagsParse = JSON.parse(hashtags)
    if (hashtagsParse[0]) {
      hashtags = hashtags.toString()
    } else {
      hashtags = 'null'
    }
    //images
    let images = JSON.stringify(dat.images)
    let imagesParse = JSON.parse(images)
    if (imagesParse[0]) {
      images = images.toString()
    } else {
      images = 'null'
    }
    //urls
    let urls = JSON.stringify(dat.urls)
    let urlsParse = JSON.parse(urls)
    if (urlsParse[0]) {
      urls = urls.toString()
    } else {
      urls = 'null'
    }

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
      isReplyTo: dat.isReplyTo,
      hashtags: hashtags,
      images: images,
      urls: urls,
      userMentions: userMentions,
      replyCount: dat.replyCount,
      retweetCount: dat.retweetCount,
      favoriteCount: dat.favoriteCount
    }
    console.log(variables)
  })

  // //return stream data
  // return stream.on('data', data => {
  //   //map and format tweet
  //   data.map(res => {
  //     //put vars in object
  //     const variables = {
  //       timestamp: datetime,
  //       symbol: res.symbol,
  //       hour: concatHour,
  //       bidSize: bidS,
  //       askPrice: askP,
  //       askSize: askS
  //     }

  //     let query = newQuoteQuery

  //     fetch('http://localhost:4000', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({query, variables})
  //     })
  //       .then(r =>
  //         console.log(
  //           r.json().then(r => {
  //             const re = r
  //             console.log(re)
  //           })
  //         )
  //       )
  //       .catch(e => console.log(e))
  //   })

  //   //End
  // })
}

setInterval(callstream, 10000)

// @Entity('tweet')
// export class Tweet extends BaseEntity {
//   @PrimaryGeneratedColumn() id: number

//   @Column('text') timestamp: string
//   @Column('text') hour: string
//   @Column('text') screenName: string
//   @Column('text') tweetId: string
//   @Column('boolean') isRetweet: boolean
//   @Column('boolean') isPinned: boolean
//   @Column('boolean') isReplyTo: boolean
//   @Column('text') text: string
//   @Column('text') userMentions: string
//   @Column('text') hashtags: string
//   @Column('text') images: string
//   @Column('text') urls: string
//   @Column('integer') replyCount: number
//   @Column('integer') retweetCount: number
//   @Column('integer') favoriteCount: number
// }

// ws.on('message', data => {
//   let dat = JSON.parse(data)
//   if (dat.table === 'quote') {
//     let quote = dat.data
//     quote.map(res => {
//       let bidS = parseInt(res.bidSize)
//       let bidP = parseFloat(res.bidPrice)
//       let askS = parseInt(res.askSize)
//       let askP = parseFloat(res.askPrice)

//       let datetime = dateFormat(res.timestamp, "UTC:yyyy-mm-dd'T'HH:MM:ss.l'Z'")
//       let concatHour = datetime.toString()
//       let str1 = concatHour.substring(2, 4)
//       let str2 = concatHour.substring(5, 7)
//       let str3 = concatHour.substring(8, 10)
//       let str4 = concatHour.substring(11, 13)

//       concatHour = str1 + str2 + str3 + str4

//       const variables = {
//         timestamp: datetime,
//         symbol: res.symbol,
//         hour: concatHour,
//         bidSize: bidS,
//         bidPrice: bidP,
//         askPrice: askP,
//         askSize: askS
//       }
//       let query = newQuoteQuery

//       fetch('http://localhost:4000', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({query, variables})
//       })
//         .then(r =>
//           console.log(
//             r.json().then(r => {
//               const re = r
//               console.log(re)
//             })
//           )
//         )
//         .catch(e => console.log(e))
//     })
//   } else if (dat.table === 'trade') {
//     //send to db
//     let trade = dat.data
//     trade.map(trade => {
//       let size = parseInt(trade.size)
//       let price = parseFloat(trade.price)

//       let datetime = dateFormat(
//         trade.timestamp,
//         "UTC:yyyy-mm-dd'T'HH:MM:ss.l'Z'"
//       )
//       let concatHour = datetime.toString()
//       let str1 = concatHour.substring(2, 4)
//       let str2 = concatHour.substring(5, 7)
//       let str3 = concatHour.substring(8, 10)
//       let str4 = concatHour.substring(11, 13)

//       concatHour = str1 + str2 + str3 + str4

//       const variables = {
//         timestamp: datetime,
//         hour: concatHour,
//         symbol: trade.symbol,
//         side: trade.side,
//         size: size,
//         price: price,
//         tickDirection: trade.tickDirection,
//         trdMatchID: trade.trdMatchID
//       }
//       let query = newTickQuery
//       fetch('http://localhost:4000', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({query, variables})
//       })
//         .then(r =>
//           console.log(
//             r.json().then(r => {
//               const re = r
//               console.log(re)
//             })
//           )
//         )
//         .catch(e => console.log(e))
//     })
//   }
// })
