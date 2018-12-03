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
    `;

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
    `;

export { newQuoteQuery, newTickQuery };
