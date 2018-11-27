import { ResolverMap } from "./types/graphql-utils";
import { GQL } from "./types/schema";
import { User } from "./entity/User";
import { Quote } from "./entity/Quote";
import { Tick } from "./entity/Tick";

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) =>
      `Hello ${name || "World"}`,
    quote: async (_, {  }: GQL.IQuoteOnQueryArguments) => {
      const t = await Quote.find({
        select: [
          "timestamp",
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
    tick: async (_, {  }: GQL.ITickOnQueryArguments) => {
      const t = await Tick.find({
        select: [
          "timestamp",
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
        symbol,
        bidSize,
        bidPrice,
        askPrice,
        askSize
      }: GQL.INewquoteOnMutationArguments
    ) => {
      const quote = Quote.create({
        timestamp,
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
  }
};
