import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from '../message/message.entity';
import { User } from "../user/user.entity";

@Entity()
export class Channel {
    @PrimaryGeneratedColumn()
    channel_id: number;

    @Column({ default: "" })
    name: string;

    @Column({ type: "smallint"})
    type: number;

    @Column({ default: "" })
    password: string;

    @ManyToMany(() => User)
    @JoinTable()
    channel_owner: User[];

    @ManyToMany(() => User)
    @JoinTable()
    blocked_users: User[];

    @ManyToMany(() => User)
    @JoinTable()
    administrators: User[];

    @ManyToMany(() => User)
    @JoinTable()
    kicked: User[];

    @ManyToMany(() => User)
    @JoinTable()
    banned: User[];

    @ManyToMany(() => User)
    @JoinTable()
    muted: User[];

    @OneToMany(() => Message, (Message) => Message.channel)
    messages: Message[]; 
}
