import { useEffect, useState } from 'react'
import IChat from '../../interfaces/IChat'
import IUser from '../../interfaces/IUser'
import "./messagingArea.css"
import { socket } from '../../socket'
import Message from './Message'
import { IMessage } from '../../interfaces/IMessage'
import axios from 'axios'

export default function MessagingArea({ chat, user }: { chat: IChat, user: IUser }) {
    const [message, setMesage] = useState('')
    const [messages, setMessages] = useState<IMessage[]>([])
    function sendMessage(msg: IMessage) {

        setMessages(prev => [...prev, msg])
    }
    useEffect(() => {
        if (chat) {

            axios.get('/chats/' + chat.id).then(res => setMessages(res.data.messages))
        }
    }, [chat])
    useEffect(() => {
        socket.on('sendMessage', sendMessage)



        return () => {
            socket.off('sendMessage', sendMessage)
        }
    }, [setMessages])


    const handleSubmit = (e) => {
        e.preventDefault()
        if (message.length > 0) {
            const msg = {
                reciever: chat.users.find(u => u.id != user.id),
                message,
                sender: user.id,
                chat: chat.id
            }
            socket.emit('recieveMsg', msg)
            setMesage('')
        }

    }
    const handleFileSubmit = (e) => {
        console.log(e.target.files[0])
        const msg = {
            reciever: chat.users.find(u => u.id != user.id),

            sender: user.id,
            chat: chat.id,

            file: { buffer: e.target.files[0], type: e.target.files[0].type, originalName: e.target.files[0].name, },
        }
        socket.emit('recieveMsg', msg)

    }
    return (
        <div className=" col  h-100 p-0">
            {chat ? <div className='h-100 top-container ' >
                <div className="bg-info bg-gradient w-100 px-4 py-2">
                    <h3>{chat.users.find(u => u.id !== user.id)?.username}</h3>
                </div>


                <div className='container mt-4 chat-area '>

                    {messages.length > 0 ? <div className='pb-3'>
                        {messages.map(m => <Message key={m.id} message={m} user={user} />)}</div> :
                        <div className='h-100 d-flex justify-content-center align-items-center'><h5 className='text-muted'>No Messages Yet</h5></div>}

                </div>


                <div className='input-container d-flex justify-content-center bg-light w-100 p-1 '>
                    <form encType='' onSubmit={handleSubmit} className='  d-flex justify-content-evenly my-2'>
                        <input value={message} onChange={(e) => { setMesage(e.target.value) }} className='form-control mx-1' type="text" name="message" id="" />
                        <button type='submit' className='btn btn-secondary mx-1'>Send</button>
                        <label className='btn mx-1' >
                            <svg width="25px" height="25px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg">

                                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                                <g id="SVGRepo_iconCarrier"> <path d="M8.10692 17.4174L15.4868 10.3512C15.9348 9.92215 16.1589 9.70764 16.2759 9.47485C16.4856 9.0579 16.4856 8.5722 16.2759 8.15525C16.1589 7.92246 15.9348 7.70794 15.4868 7.27892C15.0387 6.8499 14.8147 6.63538 14.5715 6.52328C14.1361 6.32249 13.6288 6.32248 13.1934 6.52328C12.9502 6.63538 12.7262 6.8499 12.2781 7.27892L4.95178 14.2939C3.85303 15.3459 3.30366 15.872 3.11183 16.4836C2.96272 16.9591 2.96272 17.466 3.11183 17.9414C3.30366 18.5531 3.85303 19.0791 4.95178 20.1312C6.05053 21.1832 6.5999 21.7092 7.2387 21.8929C7.73526 22.0357 8.26468 22.0357 8.76124 21.8929C9.40004 21.7092 9.94941 21.1832 11.0482 20.1312L18.4815 13.0138C19.5258 12.0138 20.048 11.5138 20.3617 10.9937C21.2128 9.58216 21.2128 7.84311 20.3617 6.43161C20.048 5.91147 19.5258 5.41147 18.4815 4.41148C17.4371 3.4115 16.9149 2.9115 16.3717 2.6112C14.8975 1.79627 13.0813 1.79627 11.6071 2.6112C11.0639 2.9115 10.5417 3.4115 9.49733 4.41148L3.5079 10.1464" stroke="#1C274C" stroke-width="0.9600000000000002" stroke-linecap="round" /> </g>

                            </svg>
                            <input onChange={handleFileSubmit} type="file" hidden name="file" id="" />
                        </label>
                    </form>
                </div>

            </div>
                : <div className='h-100 d-flex justify-content-center align-items-center text-muted'>
                    <h4>Please select chat</h4>
                </div>}



        </div>
    )
}
