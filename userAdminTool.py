import requests
from os import system


url: str = "http://localhost:3001"


def getAllUsers(verbose: bool = False):
    response = requests.get(f"{url}/user/")
    if response.status_code != 200:
        raise Exception("Couldn't get all users, reason: " + str(response.status_code) + " " + response.json()["error"])
    users: list[dict] = response.json()
    if not len(users):
        raise Exception("There are no users")
    if verbose:    
        for user in users:
            print(f"User: {user['intra_nick']}")
    return users


def deleteAllUsers():
    users: list[dict] = getAllUsers()
    if len(users) == 0:
        return
    for user in users:
        response = requests.delete(f"{url}/user/delete/{user['user_id']}")
        if response.status_code != 200:
            raise Exception(f"Couldn't delete user {user['intra_nick']}, reason: " + str(response.status_code) + " " + response.json()["error"])
        print(f"Deleted user {user['intra_nick']}")

def createDefaultUsers():
    users: list[dict] = [
        {
            "name": "John Smith",
            "nick": "JSmith",
            "email": "john.smith@example.com",
            "status": 1,
            "creation_date": "2023-05-20T10:30:00Z",
            "last_joined_date": "2023-06-10T15:45:00Z",
            "intra_nick": "JSmith"
        },
        {
            "name": "Emily Johnson",
            "nick": "EmJ",
            "email": "emily.johnson@example.com",
            "status": 1,
            "creation_date": "2023-04-15T08:15:00Z",
            "last_joined_date": "2023-06-10T15:45:00Z",
            "intra_nick": "EmJohnson"
        },
        {
            "name": "Sarah Davis",
            "nick": "SDavis",
            "email": "sarah.davis@example.com",
            "status": 1,
            "creation_date": "2023-03-10T14:20:00Z",
            "last_joined_date": "2023-06-10T15:45:00Z",
            "intra_nick": "SDavis"
        },
        {
            "name": "Michael Brown",
            "nick": "MBrown",
            "email": "michael.brown@example.com",
            "status": 1,
            "creation_date": "2023-02-05T09:10:00Z",
            "last_joined_date": "2023-06-10T15:45:00Z",
            "intra_nick": "MBrown"
        },
        {
            "name": "Emma Wilson",
            "nick": "EWilson",
            "email": "emma.wilson@example.com",
            "status": 1,
            "creation_date": "2023-01-01T12:00:00Z",
            "last_joined_date": "2023-06-10T15:45:00Z",
            "intra_nick": "EWilson"
        }
    ]
    
    for user in users:
        response = requests.post(f"{url}/user/python", data=user, files={'avatar': open('rimartin.jpg', 'rb')})
        if response.status_code == 250:
            print(f"User {user['name']} already exists")
            continue
        if response.status_code != 200:
            print(f"Couldn't create user {user['name']}, reason: " + str(response.status_code) + " " + response.json()["message"])
            continue
        user = response.json()
        print(f"user {user['user']['name']} created")


def getFriendsFromUser(intra_nick: str, has_friends: bool = False):
    response = requests.get(f"{url}/user/allfriends/{intra_nick}")
    if response.status_code != 200:
        if has_friends == True:
            return []
        raise Exception(f"    User {intra_nick} has no friends\n")
    return response.json()

def getFriendsFromUsers(verbose: bool = False):
    try:
        users: list[dict] = getAllUsers()
        
        for user in users:
            if verbose:
                print(f"\nUser {user['intra_nick']} friends:")
            friends = getFriendsFromUser(user['intra_nick'], True)
            if verbose:
                for friend in friends:
                    print(friend)
        if verbose:
            print()
    except Exception as e:
        print(e)
    
def addFriend(userId = 0, friendId = 0):
    try:
        if userId != 0 and friendId != 0:
            response = requests.get(f"{url}/user/addFriend/1/2")
            print("code: " + str(response.status_code))
        else:
            users: list[dict] = getAllUsers()
            print("\nChoose a user do add a new friend: \n")
            for index, user in enumerate(users):
                print(f"\t{index}. {user['intra_nick']}")
            index = int(input("\nOPTION: "))
            if index >= len(users):
                print("Please select a valid index")
                return
            user_choosen = users.pop(index)
            
            print("\nWhich user you want to make a friend? \n")
            friends = getFriendsFromUser(user, True)
            for friend in friends:
                for user in users.copy():
                    if user['user_id'] == friend['user_id']:
                        users.pop(user)
            for index, user in enumerate(users):
                print(f"\t{index}. {user['intra_nick']}")
            index = int(input("\nOPTION: "))
            if index >= len(users):
                print("Please select a valid index")
                return
            print(user_choosen)
            print(users[index])

            response = requests.get(f"{url}/user/addFriend/{user_choosen['user_id']}/{users[index]['user_id']}")
            print("code: " + str(response.status_code))
            # friends = response.json()
            # print(friends)
    except Exception as e:
        print(e)
    
def automate():
    createDefaultUsers()
    addFriend(1, 2)


def askUser():
    while True:
        system('clear')
        answer: str = input("""Select a option...

    1. Get All Users
    2. Create random users
    3. Delete all users
    4. Get Friends from users
    5. Add Friend to user
    6. Automate

OPTION: """)
        print()
        if answer == "1":
            getAllUsers(True)
        elif answer == "2":
            createDefaultUsers()
        elif answer == "3":
            deleteAllUsers()
        elif answer == "4":
            getFriendsFromUsers(True)
        elif answer == "5":
            addFriend()
        elif answer == "6":
            automate()
        input("Ready? Press enter to continue...")

askUser()