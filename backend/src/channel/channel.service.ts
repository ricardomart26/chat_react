import { Inject, Injectable, NotFoundException, Res, forwardRef } from '@nestjs/common';
import { Channel } from './channel.entity';
import { Repository, SaveOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateChannelDto, MessageInterface, UpdateChannelDto } from './dto/channel.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Response } from 'express';


@Injectable()
export class ChannelService {
    constructor(
        @InjectRepository(Channel) private channelRepository: Repository<Channel>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}
        
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService;
    
    async getChannels(): Promise<Channel[]> {
        console.log("Getting Channel");
        return await this.channelRepository.find({relations: ['messages']});
    }
    
    async createChannel(createChannelDto: CreateChannelDto, response: Response): Promise<Channel> {
        const createdChannel = this.channelRepository.create(createChannelDto);
        await this.channelRepository.insert(createdChannel);
        console.log("CHECK THIS ONE in createChannel backend channel.service: ", createdChannel);
        return createdChannel;
    }

    async getChannelById(channelId: number): Promise<Channel> {
        const channelExist = await this.channelRepository.findOne({
            where: {
                channel_id: channelId
            },
            relations: ['messages', 'channel_owner', 'blocked_users','administrators','kicked', 'banned', 'muted']
        });
        // console.log("channel Exists: ", channelExist); // TODO: PERCEBER O PORQUE ESTA FUNÇÃO É TANTAS VEZES CHAMADA
        if (!channelExist)
            throw new NotFoundException(`Channel ${channelId} not found`);
        return channelExist;
    }
  
    async getChannelsByUsersOwners(userId: number, friendId: number): Promise<Channel> {
        const user: User = await this.userService.findOneById(userId);

        const userChannels: Channel[] = await this.channelRepository.find({
            where: {
                type: 1,
                channel_owner: [user],
            }
        });
        for (let i = 0; i < userChannels.length; i++)
        {
            // console.log("userChannels: ", userChannels[i]);
            if (friendId in userChannels[i].channel_owner)
                return userChannels[i];
        }
        throw new NotFoundException(`Channel with ${userId} and ${friendId} not found`);
    }

    async addMessageToChannel(channelId: number, message: MessageInterface): Promise<Channel> {
        const userChannel: Channel = await this.channelRepository.findOne({
            where: {
                channel_id: channelId,
            },
            relations : ['message']
        });
        // userChannel.messages = [...userChannel.messages, message];
        return await this.channelRepository.save(userChannel);
    }
  
    async updateChannel(channel_id: number, updateChannelDto: UpdateChannelDto) {
        const channelExist = await this.channelRepository.findOne({
            where: {
                channel_id: channel_id
            }
        });
        if (!channelExist)
            throw new NotFoundException(`Channel ${channel_id} not found`);
        // return await this.channelRepository.update(channelExist, updateChannelDto);
    }
  
    async deleteChannel(channel_id: number): Promise<Channel> {
        const channelExist = await this.channelRepository.findOne({
            where: {
                channel_id: channel_id
            }
        });
        if (!channelExist)
            throw new NotFoundException(`Channel ${channel_id} not found`);
        return await this.channelRepository.remove(channelExist);
    }

}
