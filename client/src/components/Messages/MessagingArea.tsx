import { useEffect, useRef, useState } from "react";
import IChat from "../../interfaces/IChat";
import IUser from "../../interfaces/IUser";
import "./messagingArea.css";
import { socket } from "../../socket";
import Message from "./Message";
import { IMessage } from "../../interfaces/IMessage";
import axios from "axios";
import MessageForm from "./MessageForm";

export default function MessagingArea({
  chat,
  user,
}: {
  chat: IChat ;
  user: IUser;
}) {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const endRef = useRef<HTMLDivElement | any>();
  
  
  //scroling logic
  useEffect(() => {
    endRef &&
      endRef.current &&
      endRef.current.scrollIntoView({
        behavior: "smooth",
      });
  }, [messages]);

  function sendMessage(msg: IMessage) {
    setMessages((prev) => [...prev, msg]);
  }
  useEffect(() => {
   
    if (chat) {
      axios
        .get("/chats/admin/" + chat.id)
        .then((res) => setMessages(res.data.messages));
        return ()=>{}
    }
    return  setMessages([]);

  }, [chat]);
  useEffect(() => {
    socket.on('sendMessage', sendMessage);
    return () => {
      socket.off('sendMessage', sendMessage);
    };
  }, [chat,setMessages ]);

 

  return (
    <div className=" col  h-100 p-0">
      <div className="h-100 top-container ">
        <div className="bg-info bg-gradient w-100 px-4 py-2">
          <h3>{chat.user.fullName}</h3>
        </div>

        <div className="container mt-4 chat-area ">
          {messages.length > 0 ? (
            <div className="pb-3">
              {messages.map((m) => (
                <Message
                  key={m.id}
                  message={m}
                  user={user}
                />
              ))}
            </div>
          ) : (
            <div className="h-100 d-flex justify-content-center align-items-center">
              <h5 className="text-muted">No Messages Yet</h5>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="input-container d-flex justify-content-center bg-light w-100 p-1 ">
          <MessageForm chat={chat} user={user} />
        </div>
      </div>
    </div>
  );
}
