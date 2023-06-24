import React, { useState } from 'react';
import { socket } from '../socket';

export function MyForm({ user, setMessages }) {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(event) {
        event.preventDefault();
        setMessages(previous => [...previous, { user, message: value }])
        socket.emit('recieve-message', { user, message: value },);
        setValue('')
    }

    return (
        <>
            <h1>{user}</h1>
            <form onSubmit={onSubmit}>
                <input value={value} onChange={e => setValue(e.target.value)} />

                <button type="submit" disabled={isLoading}>Submit</button>
            </form></>
    );
}