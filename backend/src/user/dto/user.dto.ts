import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    name: 'nick',
    example: 'userXPTO',
  })
  @IsNotEmpty()
  nick: string;

  @ApiProperty({
    name: 'avatar',
    example: 'image.jpg',
  })
  avatar: string;

  @IsNotEmpty()
  email: string;
  
  @IsNotEmpty()
  creation_date: Date;

  @IsNotEmpty()
  last_joined_date: Date;
}

export class UpdateUserDto {
  @ApiProperty({
    name: 'nick',
    example: 'userXPTO',
  })
  @IsNotEmpty()
  @Length(5, 15)
  nick:string;

  @ApiProperty({
    name: 'avatar',
    example: 'image.jpg',
  })
  avatar:string;
}