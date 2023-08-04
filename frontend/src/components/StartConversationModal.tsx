import { useEffect, useState } from "react";
import { User } from "./store";
import axios from "axios";
import { BACKEND_URL } from "../config";

function StartConversationModal({ isOpen, friends, user }: {isOpen: Function, friends: User[], user: User}) 
{
    const [searchInput, setSearchInput] = useState<string>('');
    const [friendsSearch, setFriendsSearch] = useState<User[]>();

    useEffect(() => {
        console.log("StartConversationModal rendered");
        if (!friendsSearch)
            setFriendsSearch(friends);
    }, [searchInput])
    
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
        setFriendsSearch(filterFriends());
    }

    const filterFriends = (): User[] => {
        if (friends.length > 0)
        {
            const filteredUsers: User[] = friends.filter((friend) => {return friend.intra_nick.match(searchInput)});
            console.log("filtered Users: ", filteredUsers);
            return filteredUsers;
        }
        return ([]);
    }

    const createConversation = async (friend: User) => {
        console.log("createConversation called", user.user_id, friend.user_id);
        const response = await axios.get(`${BACKEND_URL}/user/conversation/create/${user.user_id}/${friend.user_id}`);
        if (response.status === 200) {
            console.log("Conversation created successfully");
        }
        console.log("response status: " + response.status);
        isOpen(true, friend);
    }

    const displayFriends = () => {
        let arrayToSearch: User[] | undefined = friendsSearch;
        if (!searchInput) {
            arrayToSearch = friends;
        }
        console.log("arrayToSearch: ", arrayToSearch);
        return arrayToSearch?.map((friend, index) => {
            return (
                <div key={index} className="profile" onClick={() => createConversation(friend)}>
                <img alt="user avatar" className="photo" src={friend.avatar}></img>
                <div>
                    <h3 >{friend.intra_nick}</h3>
                    <p className="last-msg">Hello World</p>
                    </div>
                </div>
            )
        });
    }

    const searchBarStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '50%',
    }

    return (
        // <div style={{position: "absolute", top: "100px"}}>
        <div style={searchBarStyle}>
            <input onChange={handleInput} type="text"></input>
            {displayFriends()}
            {/* <h1> Start Conversation Modal </h1> */}
        </div>
        // </div>
    );
}

export default StartConversationModal;