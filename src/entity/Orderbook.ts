import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm'

@Entity('orderbook')
export class OrderBook extends BaseEntity {
  @PrimaryGeneratedColumn() id: number
  @Column('text') symbol: string
  @Column('simple-json') orderbooklevels: {
    side: String
    size: Int16Array
    price: Float32Array
    timestamp: String
  }
}

// class OrderBookLevel extends BaseEntity{
//   @PrimaryGeneratedColumn("uuid") id: string;
//   @Column("simple-json")
//   orderbook:
// }

// type OrderBook {
//     id: ID!
//     action: String!
//     symbol: String!
//     orderbooklevel: [OrderBookLevel!]!
//     created: String
//   }

// type OrderBookLevel {
//   id: ID!
//   orderbook: OrderBook
//   side: String
//   size: Int
//   price: Float
//   created: String
// }
