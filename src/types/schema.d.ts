// tslint:disable
// graphql typescript definitions

export namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation
    errors?: Array<IGraphQLResponseError>
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string
    locations?: Array<IGraphQLResponseErrorLocation>
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any
  }

  interface IGraphQLResponseErrorLocation {
    line: number
    column: number
  }

  interface IQuery {
    __typename: 'Query'
    hello: string
    quote: Array<IQuote | null> | null
    tick: Array<ITick | null> | null
    chatmsg: Array<IChatMsg | null> | null
    bitfinextick: Array<IBitfinexTick | null> | null
    tweet: Array<ITweet | null> | null
    hourlytweet: Array<ITweet | null> | null
    twitchmsg: Array<ITwitchMsg | null> | null
  }

  interface IHelloOnQueryArguments {
    name?: string | null
  }

  interface IQuoteOnQueryArguments {
    id?: number | null
    timestamp?: string | null
    hour: string
    symbol?: string | null
    bidSize?: number | null
    bidPrice?: number | null
    askPrice?: number | null
    askSize?: number | null
  }

  interface ITickOnQueryArguments {
    id?: number | null
    timestamp?: string | null
    hour: string
    symbol?: string | null
    side?: string | null
    size?: number | null
    price?: number | null
    tickDirection?: string | null
    trdMatchID?: string | null
  }

  interface IChatmsgOnQueryArguments {
    channelID?: number | null
    hour: string
    fromBot?: boolean | null
  }

  interface IBitfinextickOnQueryArguments {
    timestamp?: string | null
    hour: string
    bidPrice?: number | null
    bidSize?: number | null
    askPrice?: number | null
    askSize?: number | null
    dailyChange?: number | null
    dailyChangePct?: number | null
    dailyVolume?: number | null
    dailyHigh?: number | null
    dailyLow?: number | null
  }

  interface ITweetOnQueryArguments {
    timestamp?: string | null
    currHour?: string | null
    hour: string
    screenName?: string | null
    tweetId?: string | null
    isRetweet?: boolean | null
    isPinned?: boolean | null
    isReplyTo?: boolean | null
    text?: string | null
    userMentions?: string | null
    hashtags?: string | null
    images?: string | null
    urls?: string | null
    replyCount?: number | null
    retweetCount?: number | null
    favoriteCount?: number | null
    searchTerm?: string | null
  }

  interface IHourlytweetOnQueryArguments {
    hour: string
    currHour: string
  }

  interface ITwitchmsgOnQueryArguments {
    hour: string
  }

  interface IQuote {
    __typename: 'Quote'
    id: number
    timestamp: string
    hour: string
    symbol: string
    bidSize: number
    bidPrice: number
    askPrice: number
    askSize: number
  }

  interface ITick {
    __typename: 'Tick'
    id: number
    timestamp: string
    hour: string
    symbol: string
    side: string
    size: number
    price: number
    tickDirection: string
    trdMatchID: string
  }

  interface IChatMsg {
    __typename: 'ChatMsg'
    channelID: number
    hour: string
    fromBot: boolean
    message: string
  }

  interface IBitfinexTick {
    __typename: 'BitfinexTick'
    timestamp: string
    hour: string
    bidPrice: number
    bidSize: number
    askPrice: number
    askSize: number
    dailyChange: number
    dailyChangePct: number
    dailyVolume: number
    dailyHigh: number
    dailyLow: number
  }

  interface ITweet {
    __typename: 'Tweet'
    timestamp: string
    currHour: string
    hour: string
    screenName: string
    tweetId: string
    isRetweet: boolean
    isPinned: boolean
    isReplyTo: boolean
    text: string
    userMentions: string
    hashtags: string
    images: string
    urls: string
    replyCount: number
    retweetCount: number
    favoriteCount: number
    searchTerm: string
  }

  interface ITwitchMsg {
    __typename: 'TwitchMsg'
    timestamp: string
    hour: string
    text: string
    emoji: string
    channelName: string
  }

  interface IMutation {
    __typename: 'Mutation'
    register: boolean | null
    updatetweet: boolean | null
    newquote: boolean | null
    newtick: boolean | null
    newchatmsg: boolean | null
    newbitfinextick: boolean | null
    newtweet: boolean | null
    newtwitchmsg: boolean | null
  }

  interface IRegisterOnMutationArguments {
    email: string
    password: string
  }

  interface IUpdatetweetOnMutationArguments {
    hour: string
    tweetId: string
    replyCount: number
    retweetCount: number
    favoriteCount: number
  }

  interface INewquoteOnMutationArguments {
    timestamp: string
    hour: string
    symbol: string
    bidSize: number
    bidPrice: number
    askPrice: number
    askSize: number
  }

  interface INewtickOnMutationArguments {
    timestamp: string
    hour: string
    symbol: string
    side: string
    size: number
    price: number
    tickDirection: string
    trdMatchID: string
  }

  interface INewchatmsgOnMutationArguments {
    channelID: number
    hour: string
    fromBot: boolean
    message: string
  }

  interface INewbitfinextickOnMutationArguments {
    timestamp: string
    hour: string
    bidPrice: number
    bidSize: number
    askPrice: number
    askSize: number
    dailyChange: number
    dailyChangePct: number
    dailyVolume: number
    dailyHigh: number
    dailyLow: number
  }

  interface INewtweetOnMutationArguments {
    timestamp: string
    currHour: string
    hour: string
    screenName: string
    tweetId: string
    isRetweet: boolean
    isPinned: boolean
    isReplyTo: boolean
    text: string
    userMentions: string
    hashtags: string
    images: string
    urls: string
    replyCount: number
    retweetCount: number
    favoriteCount: number
    searchTerm: string
  }

  interface INewtwitchmsgOnMutationArguments {
    timestamp: string
    hour: string
    text: string
    emoji: string
    channelName: string
  }
}

// tslint:enable
