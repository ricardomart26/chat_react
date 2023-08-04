import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateChannelDto, UpdateChannelDto } from './dto/channel.dto';
import { Channel } from './channel.entity';
import { Response } from 'express';

@ApiTags('channel')
@Controller('channel')
export class ChannelController {

    constructor(private channelService: ChannelService) {}

    @Get()
    async getChannels() {
      return await this.channelService.getChannels();
    }

    @Get('/getchannelsowners/:userId/:friendId')
    async getChannelsByUsersOwners(@Param('userId') userId: string, @Param('friendId') friendId: string) {
        return await this.channelService.getChannelsByUsersOwners(+userId, +friendId);
    }

    @Post('/create')
    async createChannel(@Res() response: Response, @Body() channelData: CreateChannelDto): Promise<Channel> {
      return await this.channelService.createChannel(channelData, response);
    }

    @Get(':id')
    getChannelById(@Param('id') id: string) {
      return this.channelService.getChannelById(+id);
    }
  
    @Patch()
    update(@Query('id') id: string, @Body() updateUserDto: UpdateChannelDto) {
      return this.channelService.updateChannel(+id, updateUserDto);
    }
  
    @Delete(':id')
    deleteChannel(@Param('id') id: string) {
      return this.channelService.deleteChannel(+id);
    }
}
