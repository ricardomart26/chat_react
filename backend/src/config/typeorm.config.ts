import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from '../user/user.entity';
import { Channel } from "../channel/channel.entity";
import { Message } from "../message/message.entity";


// Link to see settings options 
// For typeorm https://typeorm.io/data-source-options
// Forz postgres https://typeorm.io/data-source-options#postgres--cockroachdb-data-source-options
export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOSTNAME,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, Channel, Message],
    // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data
    synchronize: true
}