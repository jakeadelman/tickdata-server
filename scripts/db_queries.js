const newQuoteQuery = `
      mutation newquote(
        $timestamp: String!
        $hour: String!
        $symbol: String!
        $bidSize: Int!
        $bidPrice: Float!
        $askPrice: Float!
        $askSize: Int!
      ) {
        newquote(
          timestamp: $timestamp
          hour: $hour
          symbol: $symbol
          bidSize: $bidSize
          bidPrice: $bidPrice
          askPrice: $askPrice
          askSize: $askSize
        ) 
      }
    `

const newTweetQuery = `
      mutation newtweet(
        $timestamp: String!
        $currHour: String!
        $hour: String!
        $screenName: String!
        $tweetId: String!
        $isRetweet: Boolean!
        $isPinned: Boolean!
        $isReplyTo: Boolean!
        $text: String!
        $userMentions: String!
        $hashtags: String!
        $images: String!
        $urls: String!
        $replyCount: Int!
        $retweetCount: Int!
        $favoriteCount: Int!
        $searchTerm: String!

      ) {
        newtweet(
          timestamp: $timestamp
          currHour: $currHour
          hour: $hour
          screenName: $screenName
          tweetId: $tweetId
          isRetweet: $isRetweet
          isPinned: $isPinned
          isReplyTo: $isReplyTo
          text: $text
          userMentions: $userMentions
          hashtags: $hashtags
          images: $images
          urls: $urls
          replyCount: $replyCount
          retweetCount: $retweetCount
          favoriteCount: $favoriteCount
          searchTerm: $searchTerm
        ) 
      }
    `

const newTickQuery = `
    mutation newtick(
      $timestamp: String!,
      $hour: String!,
      $symbol: String!,
      $side: String!,
      $size: Int!,
      $price: Float!,
      $tickDirection: String!,
      $trdMatchID: String!
    ) {
      newtick(
        timestamp: $timestamp,
        hour: $hour,
        symbol: $symbol,
        side: $side,
        size: $size,
        price: $price,
        tickDirection: $tickDirection,
        trdMatchID: $trdMatchID
      )
      }
    `

const newChatMsgQuery = `
      mutation newchatmsg(
        $channelID: Int!,
        $hour: String!,
        $fromBot: Boolean!,
        $message: String!
      ){ newchatmsg(
        channelID: $channelID,
        hour: $hour,
        fromBot: $fromBot,
        message: $message
      )
    }

`
const newBitfinexTickQuery = `
      mutation newbitfinextick(
        $timestamp: String!,
        $hour: String!,
        $bidPrice: Float!,
        $bidSize: Float!,
        $askPrice: Float!,
        $askSize: Float!,
        $dailyChange: Float!,
        $dailyChangePct: Float!,
        $dailyVolume: Float!,
        $dailyHigh: Float!,
        $dailyLow: Float!,
      ){ newbitfinextick(
        timestamp: $timestamp,
        hour: $hour,
        bidPrice: $bidPrice,
        bidSize: $bidSize,
        askPrice: $askPrice,
        askSize: $askSize,
        dailyChange: $dailyChange,
        dailyChangePct: $dailyChangePct,
        dailyVolume: $dailyVolume,
        dailyHigh: $dailyHigh,
        dailyLow: $dailyLow,
      )
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

const updateTweet = `
  mutation updatetweet(
    $hour: String!, $tweetId: String!, $replyCount: Int!, $retweetCount: Int!, $favoriteCount: Int!){
    updatetweet(hour: $hour, tweetId: $tweetId, replyCount: $replyCount, retweetCount: $retweetCount, favoriteCount: $favoriteCount)
  }
`

const newTwitchMsg = `
  mutation newtwitchmsg($timestamp: String!, $hour: String!, $text: String!, $emoji: String!, $channelName: String!){
    newtwitchmsg(timestamp: $timestamp, hour: $hour, text: $text, emoji: $emoji, channelName: $channelName)
  }
`

export {
  newChatMsgQuery,
  newQuoteQuery,
  newTickQuery,
  newBitfinexTickQuery,
  newTweetQuery,
  updateTweet,
  searchT,
  newTwitchMsg
}
