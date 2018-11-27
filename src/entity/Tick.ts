import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity("tick")
export class Tick extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column("text") timestamp: string;
  @Column("text") hour: string;
  @Column("text") symbol: string;
  @Column("text") side: string;
  @Column("integer") size: number;
  @Column("decimal") price: number;
  @Column("text") tickDirection: string;
  @Column("text") trdMatchID: string;
}
