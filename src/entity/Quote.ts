import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity("quote")
export class Quote extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column("text") timestamp: string;
  @Column("text") symbol: string;
  @Column("integer") bidSize: number;
  @Column("decimal") bidPrice: number;
  @Column("decimal") askPrice: number;
  @Column("integer") askSize: number;
}
