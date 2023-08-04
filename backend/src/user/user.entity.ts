import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { Channel } from "../channel/channel.entity";

//https://orkhan.gitbook.io/typeorm/docs/many-to-one-one-to-many-relations
// enum UserStatus {
//     ONLINE = 'ONLINE',
//     OFFLINE = 'OFFLINE',
//     IN_GAME = 'IN GAME',
//     WAITING_FOR_GAME = 'WAITING_FOR_GAME',
// }

@Entity()
export class User {
 
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({nullable: true})
    nick: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({default: ""})
    avatar: string;

    @ManyToMany(() => Channel)
    @JoinTable()
    channel: Channel[];

    // @Column({ type: "smallint"})
    // status: number;

    @Column({ type: 'timestamptz' }) 
    creation_date: Date;

    @Column({ type: 'timestamptz' }) 
    last_joined_date: Date;

    @ManyToMany(() => User)
    @JoinTable()
    friends: User[];
}


// Use DBML to define your database structure
// Docs: https://github.com/holistics/dbml/tree/master/dbml-homepage/docs

