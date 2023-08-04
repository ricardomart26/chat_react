import { Module, forwardRef } from '@nestjs/common';
import { UserService} from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; 
import { Channel } from '../channel/channel.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ChannelModule } from '../channel/channel.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Channel]), MulterModule.register({ dest: './avatar_uploads'}), forwardRef(() => ChannelModule)],
  providers: [UserService],
  controllers: [UserController],
  exports : [UserService]
})
export class UserModule {}
