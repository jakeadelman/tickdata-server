import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm'

@Entity('twitchmsg')
export class TwitchMsg extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column('text') timestamp: string
  @Column('text') hour: string
  @Column('text') text: string
  @Column('text') emoji: string
  @Column('text') channelName: string
}
