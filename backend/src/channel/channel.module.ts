import { Module, forwardRef } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './channel.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
// import { AchievementService } from '../achievement/achievement.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Channel, User]), forwardRef(() => UserModule)],
  providers: [ChannelService, UserService],
  controllers: [ChannelController],
  exports: [ChannelService]
})
export class ChannelModule {}
