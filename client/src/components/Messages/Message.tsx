import { useEffect, useState } from "react";
import { IMessage } from "../../interfaces/IMessage";
import IUser from "../../interfaces/IUser";
import "./Message.css"; // Import CSS file for styling (you can use inline styles as well)
import { socket } from "../../socket";
import DoneIcon from "@mui/icons-material/Done";
import { DoneAll } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
const muted = grey["400"];
const Message = ({ message, user }: { message: IMessage; user: IUser }) => {
  const image: string[] = ["jpg", "png", "jpeg"];
  const video = ["mp4"];
  const serverURL = "http://localhost:3000";
  const [viewed, setViewed] = useState<boolean>(message.viewed);

  function sendMessage(msg: IMessage) {
    
    if (msg.sender === user.id) {
      setViewed(msg.viewed);
    }
  }

  useEffect(() => {
    
    socket.on(String(message.id), sendMessage);
    return () => {
      socket.off(String(message.id), sendMessage);
    };
  }, [setViewed]);
  useEffect(() => {
    if (message.sender != user.id && message.viewed === false) {
     
      socket.emit("messageViewed", { ...message, msg: "from admin" });
    }
  }, []);
  return (
    <div className="my-2">
      <div
        className={` ${message.sender === user.id ? "message" : "messageS"}`}
      >
        {message.message && (
          <div className="message-content">{message.message}</div>
        )}
        {message.file && (
          <div className={"" + (user.id === message.sender ? "right" : "left")}>
            {image.find(
              (i) => i === message.file.split(".")[1].toLowerCase()
            ) ? (
              <img
                className=""
                style={{ width: 200 }}
                src={serverURL + "/" + message.file}
              />
            ) : video.find(
                (i) => i === message.file.split(".")[1].toLowerCase()
              ) ? (
              <>
                <video controls className="" style={{ width: 200 }}>
                  <source src={serverURL + "/" + message.file} />
                </video>
              </>
            ) : (
              <>
                <a
                  className="message-content"
                  href={serverURL + "/" + message.file}
                >
                  Click to Dowload File
                </a>
              </>
            )}
          </div>
        )}
        {message.sender === user.id &&
          (viewed ? (
            <DoneAll style={{ color: muted }} />
          ) : (
            <DoneIcon style={{ color: muted }} />
          ))}
      </div>
    </div>
  );
};

export default Message;
