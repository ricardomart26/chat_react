import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Channel } from '../channel/channel.entity';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    message_id: number;

    @Column()
    text: string;

    @Column({type: 'timestamptz'})
    send_datetime: Date;

    @Column()
    sender_id: string;

    @Column()
    receiver_id: string;

    @Column({ default: false })
    is_read: boolean;

    @ManyToOne(() => Channel, (Channel: Channel) => Channel.messages)
    channel: Channel;
} 