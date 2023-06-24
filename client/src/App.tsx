import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { MyForm } from './components/MyForm';
import { useEffect, useState } from 'react';
import { Events } from './components/Events';
import Messages from './components/Messages';

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [user, setUser] = useState('')
  const [messages, setMessages] = useState([])
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function recieveMessage(value) {
      setMessages(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('send-message', recieveMessage);
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('send-message', recieveMessage);
    };
  }, [messages]);

  return (
    <div className="App">
      <ConnectionState isConnected={isConnected} />
      <Events />
      <ConnectionManager setUser={setUser} user={user} />
      <MyForm setMessages={setMessages} user={user} />
      <Messages user={user} messages={messages} />
    </div>
  );
}