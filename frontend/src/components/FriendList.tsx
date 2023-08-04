import { useEffect, useState } from "react";
import { User } from "./store";
import { Channel } from "./store";
// import { BACKEND_URL } from "../config";
// import axios from "axios";

const FriendList = ({intra_nick, conversations, isSelected}: {intra_nick: string, conversations: Channel[], isSelected: Function}) =>
{
    const [selectedFriend, setSelectedFriend] = useState<User>();

    useEffect(() => {
        // const user = await getUser(item.channel_owner[1]);

    }, [intra_nick, conversations]);
    
    const conversationsList = Array.isArray(conversations) ? conversations.map((item: Channel, index) => {
        console.log("item_ ", item);
        return (
            <div key={index} className="profile" onClick={() => openChat(item.channel_owner[1])}>
                <img className="photo" src={item.channel_owner[1].avatar}></img>
                <div>
                    <h3 >{item.channel_owner[1].intra_nick}</h3>
                    <p className="last-msg">Hello World</p>
                </div>
            </div>
        );
    }) : [];

    const openChat = (user: User) => {
        setSelectedFriend(user);
    };
    {/* <li key={index} style={{color: "white"}} onClick={() => openChat(item)}>MSG:[{item.intra_nick}]</li> */}

    return (

        <div className="card-main">
            {conversationsList}
            {selectedFriend &&
                <div className="teste">
                    <h3 style={{color: "white"}}> SELECTED FRIEND: {selectedFriend.intra_nick}</h3>
                </div>}
        </div>
    );
}

export default FriendList;