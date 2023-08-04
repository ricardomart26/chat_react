import { useEffect, useState } from "react";
// import { useRecoilState } from "recoil";
import { User, Channel, userState } from "./store";
import socket from "../socket";
// import FriendList from "./FriendList";
import { BACKEND_URL } from "../config";
import axios from "axios";
import StartConversationModal from "./StartConversationModal";
import FriendList from "./FriendList";

interface MessageInterface {
    message: string,
    receiver: string,
    sender: string,
    time: Date,
    channel_id: number,
}

// interface chatCommunication {
//     messages: MessageInterface[],
// }

// const temp_user = {
//     avatar: "c38fc3cfde2ac3acc875bae9bfd9c7db",
//     creation_date: "2023-04-15T08:15:00.000Z",
//     email: "emily.johnson@example.com",
//     intra_nick: "EmJohnson",
//     last_joined_date: "2023-06-10T15:45:00.000Z",
//     loss_win_games: "",
//     name: "Emily Johnson",
//     nick: "EmJ",
//     status: 1,
//     xp_total: 0,
// }

const temp_user2 = {
    avatar: "cccb97363998a1c0083bfe03b9da4804",
    creation_date: "2023-05-20T10:30:00.000Z",
    email: "john.smith@example.com",
    intra_nick: "JSmith",
    last_joined_date: "2023-06-10T15:45:00.000Z",
    loss_win_games: "",
    name: "John Smith",
    nick: "JSmith",
    status: 1,
    xp_total: 0,
    user_id: "1"
}

const message1: MessageInterface = {
    message: "Olá",
    sender: "SDavis",
    time: new Date(),
    receiver: "JSmith",
    channel_id: 0,
}

const message2: MessageInterface = {
    message: "Tudo bem?",
    sender: "SDavis",
    time: new Date(),
    receiver: "JSmith",
    channel_id: 0,
}

const message3: MessageInterface = {
    message: "Tudo e contigo?",
    sender: "JSmith",
    time: new Date(),
    receiver: "SDavis",
    channel_id: 0,
}

const message4: MessageInterface = {
    message: "Tambem",
    sender: "SDavis",
    time: new Date(),
    receiver: "JSmith",
    channel_id: 0,
}


const messages = [message1, message2, message3, message4];

function Chat() {

    // const [myUser, setMyUser] = useRecoilState(userState);
    // const [searchInput, setSearchInput] = useState<string>('');
    // const [errorMessage, setErrorMessage] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [user] = useState<User>(temp_user2);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [friends, setFriends] = useState<User[]>([]);
    const [userTalks, setUserTalks] = useState<Channel[]>([]);
    const [friendSelectedState, setFriendSelectedState] = useState<User>();

    socket.on('recMessage', (message: MessageInterface) => {
        console.log("message:", message);
    });

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get(`${BACKEND_URL}/user`);
            if (allUsers !== response.data)
                setAllUsers(response.data);
        }
        fetchUsers();
        // testing for user
        const getUserFriends = async (intra_nick: string | undefined) => {
            if (!intra_nick) return;
            const response = await axios.get(`${BACKEND_URL}/user/allfriends/${intra_nick}`);
            response.status === 260 ? setFriends([]) : setFriends(response.data);
        }
        getUserFriends(temp_user2.intra_nick);
        const getUserTalks = async (userId: string) => {
            // const channels = await axios.get(`${BACKEND_URL}/channel`);
            // console.log("channels status: ", channels.status);
            
            // console.log("channels: ", channels);
            try {
                const response = await axios.get(`${BACKEND_URL}/user/conversation/${userId}`);
                response.status === 200 ?  setUserTalks(response.data) : setUserTalks([]);
                // console.log("response: ", response.data);
            } catch (e) {
                console.log("error in getUserTalks: ", e);
            }
        }
        getUserTalks(temp_user2.user_id);
        console.log("userTalks: ", userTalks);

        // end of test
    // }, [user, friends]);
    }, [friendSelectedState, messages]);

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    }

    const handleInputEnter = async (event: any) => {
       if (event.key === 'Enter')
            handleClick(event);
    }

    const handleClick = async (event: React.MouseEvent) => {
        if (!message)
            return;
        event.preventDefault();
        const receiver = friendSelectedState;
        user ? console.log(`Sent message from ${user.intra_nick} to ${receiver?.intra_nick}: ${message}`) : console.log(`Sent message this every user: ${message}`);

        if (user && receiver)
        {
            messages.push({
                message: message,
                sender: user.intra_nick,
                time: new Date(),
                receiver: receiver.intra_nick,
                channel_id: 0,
            });
        }
        setMessage('');
    }

    // const handleSearchFriendsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearchInput(e.target.value);
    // }

    // const handleFriendRequest = async (e: React.MouseEvent) => {
    //     const friend_response = await axios.get(`${BACKEND_URL}/user/userbynick/${searchInput}`);
    //     if (friend_response.status === 200 && user) {
    //         await axios.get(`${BACKEND_URL}/user/addfriend/${user.user_id}/${friend_response.data.user_id}`);
    //         setFriends([...friends, friend_response.data]);
    //         await axios.post(`${BACKEND_URL}/channel/create`, {
    //             type: 1,
    //             channel_owner: [user.user_id, friend_response.data.user_id],
    //             blocked_users: [],
    //             administrators: [],
    //             kicked: [],
    //             banned: [],
    //             muted: []
    //         });
    //     }
    // }

    // const handleFriendDelete = async (e: React.MouseEvent) => {
    //     const friend_response = await axios(`${BACKEND_URL}/user/userbynick/${searchInput}`);
    //     if (friend_response.status === 200 && user) {
    //         const friend_added_response = await axios.delete(`${BACKEND_URL}/user/removefriend/${user.user_id}/${friend_response.data.user_id}`);
    //         const newFriends: User[] = []
    //         for (let i = 0; i < friends.length; i++) {
    //             if (friends[i].user_id === friend_added_response.data.user_id)
    //                 continue;
    //             newFriends.push(friends[i]);
    //         }
    //         setFriends(newFriends);
    //     }
    //     return;
    // }

    // const handleUserClicked = async (intra_nick: string) => {
    //     const getUserFriends = async (intra_nick: string | undefined) => {
    //         if (!intra_nick) return;
    //         const response = await axios(`${BACKEND_URL}/user/allfriends/${intra_nick}`);
    //         response.status === 260 ? setFriends([]) : setFriends(response.data);
    //     }
    //     allUsers.map((user) => {
    //         if (user.intra_nick === intra_nick)
    //             console.log(user); setUser(user);
    //     });
    //     getUserFriends(intra_nick);
    // }

    // const isFriendSelected = (friendSelected: User) => {
    //     setFriendSelected(friendSelected);
    // }

    const getMessages = (message: any, index: number) => {
            if (!friendSelectedState)
                return ;
            
            const msgStyle = {
                padding: "3px 0px 3px 1000px",
                color: "white"
            }
            // console.log("receiver: " + message.receiver);
            // console.log("sender: " + message.sender);

            if (message.sender === user?.intra_nick && message.receiver === friendSelectedState.intra_nick)
                return (<p style={msgStyle} key={index}>{message.message}</p>);
            else if (message.sender === friendSelectedState.intra_nick && message.receiver === user?.intra_nick)
                return (<p style={{padding: "3px 0px 3px 10px", color: "black"}} key={index}>{message.message}</p>);
            return ;
    }

    const handleCreateConversation = () => {
        const modal = document.getElementById("myModal");
        if (modal)
            modal.style.display = "block";
    }

    const hideModal = (hide: boolean, userClicked: User) => {
        if (!hide) return ;
        const modal = document.getElementById("myModal");
        if (modal)
            modal.style.display = "none";
        const getUserTalks = async (userId: string) => {
            // const channels = await axios.get(`${BACKEND_URL}/channel`);
            // console.log("channels status: ", channels.status);
            
            // console.log("channels: ", channels);
            const response = await axios.get(`${BACKEND_URL}/user/conversation/${userId}`);
            response.status === 200 ? setUserTalks(response.data) : setUserTalks([]) ;
            console.log("response: ", response.data);
        }
        getUserTalks(temp_user2.user_id);
        setFriendSelectedState(userClicked);
    }

    window.onclick = (event) => {
        const modal = document.getElementById("myModal");
        if (modal && event.target === modal)
            modal.style.display = "none";
    };

    const getConversations = (friend: Channel) => {
        console.log(friend);
        return (<h1 style={{color: "white"}}>{friend.channel_id ? friend.channel_id : "Teste"}</h1>);
    }

    return (
        <div>
            <div className="main"></div>
            <div>
                {allUsers ?
                    <div className="main-box">
                        {/* <div className="temp">
                            <h1> Choose a user </h1>
                            <ul style={{ listStyleType: "none" }}>
                                {allUsers.map((item, key) =>
                                    <li key={key} onClick={() => handleUserClicked(item.intra_nick)} style={{ color: "white", margin: 10 }}>{item.intra_nick}</li>)}
                            </ul>
                        </div> */}
                        <div className="friends">
                            {/* <div className="temp">
                                <label style={{ color: "white" }}>Add a friend  </label>
                                <input type="text" onChange={handleSearchFriendsInput} />
                                <button type="button" onClick={handleFriendRequest}>+</button>
                                <label style={{ color: "white" }}>Remove a friend  </label>
                                <input type="text" onChange={handleSearchFriendsInput} />
                                <button type="button" onClick={handleFriendDelete}>-</button>
                            </div> */}
                            {/* <div> */}
                            <div>
                                <h1 className="main-title"> Friends of {user?.intra_nick}</h1>
                            </div>
                            {userTalks ? userTalks.map((friend) => getConversations(friend)): null}
                            {/* {user ? <FriendList conversations={userTalks} intra_nick={user.intra_nick} isSelected={() => console.log("teste")} /> : null} */}
                            <button type="button" onClick={handleCreateConversation} className="modalBtn">+</button>
                        </div>

                        <div className="chat">
                            <div style={{border: "solid 1px black", padding: "5px 5px 5px 5px", margin: "0px"}}>
                                {friendSelectedState ? <h2>{friendSelectedState?.intra_nick}</h2>: <h2>Choose a friend</h2>}
                            </div>
                            <div style={{backgroundColor: "red", height: "85%" , overflow: "scroll", scrollbarColor: "red orange", scrollbarWidth: "thin"}}>
                                {allUsers && messages.map((message: MessageInterface, index: number) => getMessages(message, index))}
                            </div>
                            <div>
                                <input style={{backgroundColor: "rgba(78, 54, 54, 0.60)", color: "white", border: "solid 0px black", width: "97%"}} 
                                        type="text" value={message} 
                                        placeholder="Write a message..." 
                                        onChange={handleInputChange} 
                                        onKeyDown={handleInputEnter}
                                        name="message"/>
                                <button type="submit" onClick={handleClick} style={{backgroundColor: "rgba(78, 54, 54, 0.60)", border: "solid 0px black", color: "white", width: "26px" }}>   &#62;   </button>
                            </div>
                        </div>
                    
                    </div>
                    :
                    <h1> No users </h1>
                    }
                    <div id="myModal" className="modalClass">
                        <StartConversationModal isOpen={hideModal} friends={friends} user={user}/>
                    </div>

            </div>
        </div>
    );
}


export default Chat;
