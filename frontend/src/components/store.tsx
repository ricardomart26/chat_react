
import { atom } from "recoil";

export enum StatusType {
    ONLINE = 0,
    OFFLINE,
    IN_GAME,
    WAITING_FOR_GAME
}

export interface User {
    intra_nick: string;
    name: string;
    email: string,
    status: StatusType,
    nick?: string,
    avatar?: string;
    user_id?: string
}
  
export interface Channel {
    channel_id: number;
    name: string;
    type: number;
    password: string;
    channel_owner: User[];
    blocked_users: User[];
    administrators: User[];
    kicked: User[];
    banned: User[];
    muted: User[];
    messages: Message[]; 
}

export interface Message {
    message_id: number;
    text: string;
    message_time: Date;
    sender: string;
    isRead: boolean;
}


export const userState = atom({
    key: "User",
    default: {} as User,
});


