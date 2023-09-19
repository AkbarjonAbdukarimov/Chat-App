import { Avatar, Badge } from "@mui/material";
import "./User.css";
import IChat from "../../interfaces/IChat";
import { useEffect, useState } from "react";
import { socket } from "../../socket";
import { IMessage } from "../../interfaces/IMessage";
export default function User({
  chat,
  selectedChat,
}: {
  chat: IChat;
  selectedChat: IChat;
}) {
  const [unreadMsgs, setUnread] = useState<number>(chat.unreadMsgs || 0);
  const [isOnline, setOnline] = useState<boolean>(false);
  const user = chat?.user;
  function incrementUnread(msg: IMessage) {
    if (msg.sender === chat.user._id) {
      
      if (!msg.viewed) {
        setUnread((prev) => prev + 1);
        return;
      }
    }
  }
  useEffect(() => {
    if (selectedChat && chat.id === selectedChat.id) {
      
      setUnread(0);
      return;
    }
  }, [selectedChat]);
  useEffect(() => {
    socket.on(String(user.id), incrementUnread);
    return () => {
      socket.off(String(chat.id), incrementUnread);
    };
  }, [setUnread]);

  if (user)
    return (
      <div className="user-conteiner py-3 px-4 d-flex  align-items-center">
        <Badge
          className="me-3"
          badgeContent={unreadMsgs.toString()}
          color="secondary"
        >
          <Badge
            color={isOnline ? "success" : "error"}
            badgeContent={""}
            invisible={false}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Avatar className="" alt="Profile Picture">
              {user.fullName[0]}
            </Avatar>
          </Badge>
        </Badge>

        <h3 className="m-0 p-0">{user.fullName}</h3>
      </div>
    );
  return;
}
