import { useContext, useState } from 'react';
import Login from './components/Login';
import Chats from './components/Chats';
import UserContext from './context/userContext';
import MessagingArea from './components/Messages/MessagingArea';
import IChat from './interfaces/IChat';


// Update with your server URL

function App() {

  const { user, setUser } = useContext(UserContext)
  const [selectedChat, setSelectedChat] = useState<IChat | undefined>()


  return (
    <>
      {!user ? <Login setUser={setUser} /> : <>
        <div style={{
          height: '100vh'
        }} className='row p-0 m-0' >
          <Chats selectChat={setSelectedChat} />
          <MessagingArea user={user} chat={selectedChat} />
        </div>
      </>}
    </>

  );
}

export default App;
