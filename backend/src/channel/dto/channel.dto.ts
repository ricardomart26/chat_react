import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateChannelDto {  
  
    @ApiProperty({
      name: 'name',
      example: '',
    })
    @IsNotEmpty()
    name: string;
      
    @ApiProperty({
      name: 'type',
      example: '',
    })
    @IsNotEmpty()
    type: number;

    @ApiProperty({
      name: 'password',
      example: '',
    })
    password: string;
    
    @ApiProperty({
      name: 'channel_owner',
      example: '',
    })
    channel_owner: User[];
    
    @ApiProperty({
      name: 'blocked_user',
      example: '',
      isArray: true,
    })
    blocked_users: User[];
    
    @ApiProperty({
      name: 'administrators',
      example: '',
      isArray: true,
    })
    administrators: User[];
    
    @ApiProperty({
      name: 'kicked',
      example: '',
      isArray: true,
    })
    kicked: User[];
    
    @ApiProperty({
      name: 'banned',
      example: '',
      isArray: true,
    })
    banned: User[];
    
    @ApiProperty({
      name: 'muted',
      example: '',
      isArray: true,
    })
    muted: User[];
}


export class UpdateChannelDto {  
  
  @ApiProperty({
    name: 'type',
    example: '',
  })
  @IsNotEmpty()
  type: number;
  
  @ApiProperty({
    name: 'name',
    example: '',
    default: '',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'password',
    example: '',
    default: '',
  })
  password: string;
  
  @ApiProperty({
    name: 'channel_owner',
    example: '',
    isArray: true,
  })
  channel_owner: User[];
  
  @ApiProperty({
    name: 'blocked_user',
    example: '',
    isArray: true,
  })
  blocked_users: User[];
  
  @ApiProperty({
    name: 'administrators',
    example: '',
    isArray: true,
  })
  administrators: User[];
  
  @ApiProperty({
    name: 'kicked',
    example: '',
    isArray: true,
  })
  kicked: User[];
  
  @ApiProperty({
    name: 'banned',
    example: '',
    isArray: true,
  })
  banned: User[];
  
  @ApiProperty({
    name: 'muted',
    example: '',
    isArray: true,
  })
  muted: User[];
}


export class MessageInterface {  
  text: string;
  message_time: Date;
  sender: string;
  isRead: boolean;
}