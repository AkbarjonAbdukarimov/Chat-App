import { useContext } from "react";
import Login from "./components/Login";
import Chats from "./components/Chats";
import UserContext from "./context/userContext";

// Update with your server URL

function App() {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <>
          <div
            style={{
              height: "100vh",
            }}
            className="d-flex p-0 m-0"
          >
            <Chats />
            
          </div>
        </>
      )}
    </>
  );
}

export default App;
