import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number

  @Column('varchar', {length: 255}) email: string
  @Column('text') password: string
}
