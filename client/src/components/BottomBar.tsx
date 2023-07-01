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
import { Button, Input } from '@mui/material';
import { useEffect } from 'react';
import { socket } from '../socket';
import user from '../types/user.type';
import Message from '../types/message.type'


export default function BottomBar({ chat, sender }) {
    const [msg, setMsg] = React.useState('');
    const [messages, setMessages] = React.useState<Message[]>([]);
    const onMessage = (msg: Message) => {
        setMessages([...messages, msg]);
    }
    const sendMessage = () => {
        socket.emit
    }
    useEffect(() => {
        socket.on('private-message-sending', onMessage)
        return () => {
            socket.off('private-message-sending', onMessage)
        }
    }, [setMessages])
    return (
        <Box sx={{ pb: 7 }} >
            <CssBaseline />
            <List>
                {messages.map((m,) => (
                    <ListItem button key={m.sender.id + m.reciver.id}>
                        <ListItemAvatar>
                            <Avatar alt="Profile Picture" />
                        </ListItemAvatar>
                        <ListItemText primary={m.message} secondary={m.sender.user} />
                    </ListItem>
                ))}
            </List>
            <Paper className='p-3' sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation className='d-flex justify-content-center align-items-center'>
                    <div className="">
                        <input placeholder='Some message' type="text" value={msg} onChange={e => { setMsg(e.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <Button className='ms-3' variant="outlined">Submit</Button>
                </BottomNavigation>
            </Paper>
        </Box>
    );
}



