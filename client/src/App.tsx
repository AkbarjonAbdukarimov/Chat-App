import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import { socket } from './socket';
import MenuAppBar from './components/MenuAppBar';
import BottomBar from './components/BottomBar';

// Update with your server URL

function App() {
  const [chat, setChat] = useState();
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const userString = localStorage.getItem('user')
    if (userString) {
      const user = JSON.parse(userString);
      if (user) setUser(user)
    }
  }, [])
  useEffect(() => {
    if (user) {
      const userString = JSON.stringify(user)
      localStorage.setItem('user', userString)
      socket.connect();
      socket.emit('newUser', userString)
    }
  }, [user])




  return (
    <>
      {!user ? <Login setUser={setUser} /> : <>

        <MenuAppBar selectChat={setChat} users={users} user={user} setUser={setUser} />
        <BottomBar chat={chat} sender={user} />

      </>}
    </>

  );
}

export default App;
