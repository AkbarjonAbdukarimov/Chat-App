
import { IMessage } from '../../interfaces/IMessage';
import IUser from '../../interfaces/IUser';
import './Message.css'; // Import CSS file for styling (you can use inline styles as well)
const Message = ({ message, user }: { message: IMessage, user: IUser }) => {
    const image: string[] = ["jpg", "png", 'jpeg']
    const video = ['mp4']
    const serverURL = "http://192.168.0.113:3000"
    return (
        <>
            {message.message && <div className={user.id === message.sender ? 'message-orange' : "message-blue"}>


                <div className="message-content">{message.message}</div>

            </div>}

            {message.file &&
                <div className={user.id === message.sender ? "right" : "left"}>
                    {image.find(i => i === message.file.split('.')[1]) && <img className='w-75' src={serverURL + '/' + message.file} />}
                    {video.find(i => i === message.file.split('.')[1]) && <video controls className='w-75'  >
                        <source src={serverURL + '/' + message.file} /></video>}

                </div>}
        </>
    );
};

export default Message;