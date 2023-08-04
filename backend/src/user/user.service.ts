import { Injectable, Inject, forwardRef  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UpdateResult } from 'typeorm';
import { Channel } from '../channel/channel.entity';
import { Response} from 'express';
import { ChannelService } from '../channel/channel.service';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Channel) private channelRepository: Repository<Channel>
  ) {}

  @Inject(forwardRef(() => ChannelService))
  private readonly channelService: ChannelService;
  
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
  
  async createUser(userDto: CreateUserDto, response: Response, file: Express.Multer.File): Promise<Response<User>> {
    let earror=false;

    const user = await this.userRepository.findOneBy({nick: userDto.nick});
    if (user) {
      console.log("User already exist with this parameters:",user);
      return response.status(250).send({message:"Error - nick already exist", user: user});
    }

    userDto.avatar = file.filename;
    const createdUser = this.userRepository.create(userDto);   

    const newUser = await this.userRepository.insert(createdUser).catch((Error) => {
      earror = true;
      // return response.status(260).send({message: `Please check parameters: ${Error}`, user: newUser});
    });
    if(!earror)
      return response.status(200).send({message: "User Created Successfuly", user: createdUser});
    return response.status(260).send({message: `Please check parameters: ${Error}`, user: createdUser});
    
  }

  async getUserFriends(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneBy({nick: username});
  }

  async findOneByNick(nick: string, response: Response): Promise<Response<string | User>> {
    const user = await this.userRepository.findOneBy({nick: nick})
    if (!user)
      return response.status(250).send("User not found");
    return response.status(200).send(user);
  }

  async findOneById(userId: number): Promise<User> {
    return await this.userRepository.findOne({where: {user_id: userId}});
  }

  async addUserToChannel(userId: number,channelId: number, response: Response) {
    const user = await this.userRepository.findOne({where: {user_id: userId}});
    const channel = await this.channelRepository.findOne({where : {channel_id: channelId}});
    console.log("id do channel",channelId);
    if(!user)
      return await response.status(270).send("User doesn't exist");
    
    const channels_= await (await this.userRepository.findOne({where: {user_id: userId},  relations: ['channel'] })).channel;
    if(!channel){
      return await response.status(270).send("channel doesn't exist");
    }
    user.channel= [];
    for (let i = 0; i < channels_.length; i++) 
      user.channel.push(channels_[i]);
    user.channel.push(channel);
    return await response.status(200).send(this.userRepository.save(user));
  }
 
  async addFriendToUser(userId: number, friendId: number, response: Response): Promise<Response> {
    
    // The { relations: ['friends'] } option is used to eagerly load the friends relationship along with the user entity.
    const user: User = await this.userRepository.findOne({
      where: {
        user_id: userId
      },
      relations: ['friends']
    });
    
    if (!user)
      return response.status(404).send({message: `User with id ${userId} does not exist`, user: user});
    
    for (const f of user.friends)
    {
      if (f.user_id === friendId)
        return ;
    }

    const friend: User = await this.userRepository.findOne({
      where: {
        user_id: friendId
      },
      relations: ['friends']
    });
    
    if (!friend)
      return response.status(404).send({message: `friend with id ${friendId} does not exist`});
    
    user.friends = [...user.friends, friend];
    friend.friends = [...friend.friends, user];
    await this.userRepository.save(user);
    await this.userRepository.save(friend);
    return response.status(200).send({message: "Added a friend to the list of friends"});

  }

  async deleteFriend(userId: number, friendId: number, response: Response) {
    
    // The { relations: ['frielnds'] } option is used to eagerly load the friends relationship along with the user entity.
    const user: User = await this.userRepository.findOne({
      where: {
        user_id: userId
      },
      relations: ['friends']
    });
    
    if (!user)
      return response.status(404).send({message: `User with id ${userId} does not exist`, user: user});
    
    user.friends = user.friends.filter((friend: User) => friend.user_id !== friendId);;
    await this.userRepository.save(user);
    
    const friend: User = await this.userRepository.findOne({
      where: {
        user_id: friendId
      },
      relations: ['friends']
    });
    
    if (!friend)
      return response.status(404).send({message: `friend with id ${friendId} does not exist`});

    friend.friends = friend.friends.filter((friend: User) => friend.user_id !== userId);
    await this.userRepository.save(friend);
    return response.status(200).send({message: "Removed a friend to the list of friends", friend: friend},);
  }

  async updateUser(userId: number, updateUser: UpdateUserDto): Promise<UpdateResult> {
    const user: User = await this.userRepository.findOne({
      where: {
        user_id: userId,
      }
    });
    return await this.userRepository.update(userId, updateUser);
  }

  async deleteUser(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({where: {user_id: userId}});
    return await this.userRepository.remove(user)
  }

  async createPrivateConversation(userId: number, friendId: number, response: Response) {
    
    const user: User = await this.userRepository.findOne({
      where: {
        user_id: userId
      },
      relations: ['channel']
    });
    
    if (!user)
      return response.status(404).send({message: `User with id ${userId} does not exist`, user: user});

    const friend: User = await this.userRepository.findOne({
      where: {
        user_id: friendId
      },
      relations: ['channel']
    });
    
    // if (!friend)
    //   return response.status(404).send({message: `friend with id ${friendId} does not exist`});


    let channelCreated: Channel = await this.channelService.createChannel({
      type: 1,
      name: "",
      password: "",
      channel_owner: [user, friend],
      blocked_users: [],
      administrators: [],
      kicked: [],
      banned: [],
      muted: []
    }, response);

    // console.log("Conversation created TESTE");
    user.channel = [...user.channel, channelCreated]
    friend.channel = [...friend.channel, channelCreated]
    console.log("Conversation created user.channel: ", user);
    await this.userRepository.save(user);
    await this.userRepository.save(friend);
    return response.status(200).send(`Created a conversation between ${user.nick} and ${friend.nick}`);
  }

  async  getAllConversations(userId: number, response: Response) 
  {
    const user = await this.userRepository.findOne({
      where: { 
        user_id: userId
      },
      relations: ['channel']
    });
    let channelsFromUser: Channel[] = [];
    for (const channel of user.channel)
    {
      const response: Channel = await this.channelService.getChannelById(+channel.channel_id);
      channelsFromUser.push(response);
    }

    return response.status(200).send(channelsFromUser);
  }

}
