import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity("bitfinextick")
export class BitfinexTick extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column("text") timestamp: string;
    @Column("text") hour: string;
    @Column("decimal") bidPrice: number;
    @Column("decimal") bidSize: number;
    @Column("decimal") askPrice: number;
    @Column("decimal") askSize: number;
    @Column("decimal") dailyChange: number;
    @Column("decimal") dailyChangePct: number;
    @Column("decimal") dailyVolume: number;
    @Column("decimal") dailyHigh: number;
    @Column("decimal") dailyLow: number;
}


