import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import { socket } from './socket';
import MenuAppBar from './components/MenuAppBar';
import BottomBar from './components/BottomBar';

// Update with your server URL

function App() {
  const [chat, setChat] = useState(null);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  function onUsers(msg) {
    setUsers(msg)
    console.log('users', msg)
    if (!user) { setUser(msg.at(-1)) }

  }
  useEffect(() => {

    socket.on('users', onUsers)
    // socket.onAny((event, ...args) => {
    //   console.log(event, args);
    // });
    return () => {
      socket.off('users', onUsers)
    }
  }, [setUsers])


  return (
    <>
      {!user ? <Login /> : <>
        {/* <Sidebar user={user} users={users} /> */}
        <MenuAppBar selectChat={setChat} users={users} user={user} />
        <BottomBar chat={chat} sender={user} />
        {/* {chat && chat.user} */}
        {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
      </>}
    </>

  );
}

export default App;
