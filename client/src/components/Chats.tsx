import { Dispatch, useContext, useEffect, useState } from "react";
import User from "./User/User";
import IChat from "../interfaces/IChat";
import axios from "axios";
import UserContext from "../context/userContext";
import { socket } from "../socket";


export default function Chats({ selectChat }: { selectChat: Dispatch<React.SetStateAction<IChat | undefined>> }) {
    const [chats, setChats] = useState<IChat[]>([])
    const { user, setUser } = useContext(UserContext)
    useEffect(() => {
        axios.get('/chats').then(res => setChats(res.data))
    }, [])
    return (
        <div className=" col-3 bg-primary  h-100 ">
            <div className="w-100 container py-2">
                <h2 onClick={() => selectChat(undefined)} style={{ cursor: "pointer" }} className="chat-title text-white ">Chats</h2>
                <button className="btn btn-success" onClick={() => { setUser(undefined); localStorage.clear(); }}>Log Out</button>
            </div>
            <div>
                {chats.map(c => <div key={c.id} onClick={() => { selectChat(c); socket.emit('chatSelected', c) }}><User user={c.users.find(u => u.id !== user.id)} /></div>)}
            </div>
        </div>


    )
}


