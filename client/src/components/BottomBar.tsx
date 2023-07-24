import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { useEffect } from 'react';
import { socket } from '../socket';
import Message from '../types/message.type'


export default function BottomBar({ chat, sender }) {
    const [msg, setMsg] = React.useState('');
    const [messages, setMessages] = React.useState<Array<Message>>([]);
    const onMessage = async (msg: Message) => {
        setMessages(prev => {
            return [...prev, msg]
        });
    }
    const sendMessage = (e) => {
        e.preventDefault()
        if(msg.legth<=0){
            console.log('empty msg')
        return
        }
        setMessages(prev => {
            return [...prev, { message: msg, sender, reciver: chat }]
        });
        socket.emit('private-message-sending', { message: msg, sender, reciver: chat });
        setMsg('');
        return
    }
    useEffect(() => {
        socket.on('private-message-recieving', onMessage)
        return () => {
            socket.off('private-message-recieving', onMessage)
        }
    }, [setMessages])
    if (chat) return <>
        <Box sx={{ pb: 7 }} >
            <CssBaseline />

            <List>
                {messages.map((m) => {
                    if (m.sender.id === chat.id && m.reciver.id === sender.id || m.reciver.id === chat.id && m.sender.id) {
                        return <ListItem button key={m.sender.id + m.message + m.reciver.id}>
                            <ListItemAvatar>
                                <Avatar alt="Profile Picture" />
                            </ListItemAvatar>
                            <ListItemText primary={m.message} secondary={m.sender.user} />
                        </ListItem>
                    }
                    return

                }
                )}
            </List>
            <Paper className='p-3' sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation >
                    <form className='d-flex justify-content-center align-items-center' onSubmit={sendMessage}>
                        <div className="">
                            <input placeholder='Some message' autoComplete='flase' type="text" value={msg} onChange={e => { setMsg(e.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <button className='btn btn-primary ms-3' >Submit</button>

                    </form>
                </BottomNavigation>
            </Paper>
        </Box>
    </>
    return <></>
}



