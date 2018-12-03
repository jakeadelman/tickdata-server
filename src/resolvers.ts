import { ResolverMap } from "./types/graphql-utils";
import { GQL } from "./types/schema";
import { User } from "./entity/User";
import { Quote } from "./entity/Quote";
import { Tick } from "./entity/Tick";
export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) =>
      `Hello ${name || "World"}`,
    quote: async (_, { hour, symbol }: GQL.IQuoteOnQueryArguments) => {
      const t = await Quote.find({
        where: { hour: hour, symbol: symbol },
        select: [
          "timestamp",
          "hour",
          "symbol",
          "bidSize",
          "bidPrice",
          "askPrice",
          "askSize"
        ]
      });
      console.log(t[0]);
      return t;
    },
    tick: async (_, { hour, symbol }: GQL.ITickOnQueryArguments) => {
      const t = await Tick.find({
        where: { hour: hour, symbol: symbol },
        select: [
          "timestamp",
          "hour",
          "symbol",
          "side",
          "size",
          "price",
          "tickDirection",
          "trdMatchID"
        ]
      });
      console.log(t[0]);
      return t;
    }
  },
  Mutation: {
    register: async (
      _,
      { email, password }: GQL.IRegisterOnMutationArguments
    ) => {
      const user = User.create({
        email,
        password
      });
      await user.save();
      return true;
    },
    newquote: async (
      _,
      {
        timestamp,
        hour,
        symbol,
        bidSize,
        bidPrice,
        askPrice,
        askSize
      }: GQL.INewquoteOnMutationArguments
    ) => {
      const quote = Quote.create({
        timestamp,
        hour,
        symbol,
        bidSize,
        bidPrice,
        askPrice,
        askSize
      });
      await quote.save();
      return true;
    },
    newtick: async (
      _,
      {
        timestamp,
        hour,
        symbol,
        side,
        size,
        price,
        tickDirection,
        trdMatchID
      }: GQL.INewtickOnMutationArguments
    ) => {
      const tick = Tick.create({
        timestamp,
        hour,
        symbol,
        side,
        size,
        price,
        tickDirection,
        trdMatchID
      });
      await tick.save();
      return true;
    }
    // neworderbook: async (
    //   _,
    //   { symbol }: GQL.INeworderbookOnMutationArguments
    // ) => {
    //   const orderbook = OrderBook.create({
    //     symbol
    //   });
    //   await orderbook.save();
    //   return true;
    // },
    // neworderbooklevel: async (_, {})=> {
    //   const orderbooklevel = Orderbook.insert
    // }

    // neworderbook: async (
    //   _,
    //   {symbol, orderbooklevels}: GQL.INeworderbookonMutationArguments => {
    //   // const orderbook = OrderBook.create({
    //   //   symbol,
    //   //   side,
    //   //   orderbooklevel: orderbookLevels
    //   //   price,
    //   //   tickDirection,
    //   //   trdMatchID
    //   // });
    //   // await orderbook.save();
    //   // return true;
    // },
    //     @Entity("orderbook")
    // export class OrderBook extends BaseEntity {
    //   @PrimaryGeneratedColumn("uuid") id: string;
    //   @Column("text") symbol: string;
    //   @Column("simple-json") orderbooklevel: {
    //     side: String;
    //     size: Int16Array;
    //     price: Float32Array;
    //     timestamp: String;
    //   };
  }
};
