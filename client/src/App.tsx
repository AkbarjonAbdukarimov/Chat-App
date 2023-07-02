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

  function onUsers(msg) {
    setUsers(msg)
  }
  function connectedUser(msg) {

    setUser(msg)
  }
  useEffect(() => {

    socket.on('users', onUsers)
    socket.on('connected-user', connectedUser)
    // socket.onAny((event, ...args) => {
    //   console.log(event, args);
    // });
    return () => {
      socket.off('users', onUsers)
      socket.off('connected-user', connectedUser)
    }
  }, [setUser])


  return (
    <>
      {!user ? <Login setUser={setUser} /> : <>

        <MenuAppBar selectChat={setChat} users={users} user={user} />
        <BottomBar chat={chat} sender={user} />

      </>}
    </>

  );
}

export default App;
