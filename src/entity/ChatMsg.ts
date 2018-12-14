import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity("chatmsg")
export class ChatMsg extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column("integer") channelID: number;
    @Column("text") hour: string;
    @Column("boolean") fromBot: boolean;
    @Column("text") message: string;
}

