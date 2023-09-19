import { Dispatch, useContext, useEffect, useState } from "react";
import User from "./User/User";
import IChat from "../interfaces/IChat";
import axios from "axios";
import UserContext from "../context/userContext";
import { socket } from "../socket";
import IUser from "../interfaces/IUser";
import MessagingArea from "./Messages/MessagingArea";

export default function Chats() {
  const [chats, setChats] = useState<IChat[]>([]);
  const [selectedChat, selectChat] = useState<IChat>();
  const { user, setUser } = useContext(UserContext);
  function listenNewChats(chat: IChat) {
    const existingChat = chats.find((c) => {
      if (c.id === chat.id) {
        return c;
      }
      return;
    });

    if (!existingChat) {
      setChats((prev) => [...prev, chat].reverse());
      return;
    }
  }
  function handleUserDisconnect(user: IUser) {
    setChats((prev) =>
      prev.map((c) => {
        if (c.user.id === user.id) {
          return { ...c, user };
        }
        return c;
      })
    );
    
  }
  useEffect(() => {
    axios.get("/chats/admin").then((res) => setChats(res.data));
    return () => {};
  }, []);
  useEffect(() => {
    socket.on("newChatAdminNotification", listenNewChats);
    return () => {
      socket.off("newChatAdminNotification", listenNewChats);
    };
  }, [chats, setChats]);

  return (
    <>
      <div className=" bg-primary  h-100 ">
        <div className="w-100 container py-2">
          <h2
            onClick={() => selectChat(undefined)}
            style={{ cursor: "pointer" }}
            className="chat-title text-white "
          >
            Chats
          </h2>
          <button
            className="btn btn-success"
            onClick={() => {
              setUser(undefined);
              socket.disconnect();
              localStorage.clear();
            }}
          >
            Log Out
          </button>
        </div>
        <div>
          {chats.map((c) => (
            <div
              className="d-flex"
              key={c.id}
              onClick={() => {
                selectChat(c);
                socket.emit("chatSelected", c);
              }}
            >
              <User chat={c} selectedChat={selectedChat!} />
            </div>
          ))}
        </div>
      </div>
      {selectedChat && user && (
        <MessagingArea user={user} chat={selectedChat} />
      )}
    </>
  );
}
