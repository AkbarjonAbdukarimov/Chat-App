import { useState } from 'react';
import { socket } from '../socket';

export function ConnectionManager({ setUser, user }) {
    const [input, setInput] = useState()
    function connect() {

        socket.connect();
        setUser(input)
    }

    function disconnect() {
        setUser(undefined)
        socket.disconnect();
    }

    return (
        <>
            <input type="text" value={input} onChange={(e) => { setInput(e.target.value) }} />
            <button onClick={connect}>Connect</button>
            <button onClick={disconnect}>Disconnect</button>
        </>
    );
}