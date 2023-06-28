import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import { socket } from './socket';
// Update with your server URL

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState();
  function onUsers(users) {
    setUsers(users)
  }
  useEffect(() => {

    socket.on('users', onUsers)
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
    return () => {
      socket.off('users', onUsers)
    }
  }, [setUsers])


  return (
    <>
      {!user ? <Login setUser={setUser} /> : <>{user}</>}
    </>

  );
}

export default App;
