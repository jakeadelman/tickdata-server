import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm'

@Entity('tweet')
export class Tweet extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column('text') timestamp: string
  @Column('text') currHour: string
  @Column('text') hour: string
  @Column('text') screenName: string
  @Column('text') tweetId: string
  @Column('boolean') isRetweet: boolean
  @Column('boolean') isPinned: boolean
  @Column('boolean') isReplyTo: boolean
  @Column('text') text: string
  @Column('text') userMentions: string
  @Column('text') hashtags: string
  @Column('text') images: string
  @Column('text') urls: string
  @Column('integer') replyCount: number
  @Column('integer') retweetCount: number
  @Column('integer') favoriteCount: number
  @Column('text') searchTerm: string
}
