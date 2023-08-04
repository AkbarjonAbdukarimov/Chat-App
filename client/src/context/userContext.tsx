import { Dispatch, createContext, useEffect, useState } from "react";
import IUser from "../interfaces/IUser";
import { socket } from "../socket";
import axios from "axios";
interface IUserContext {
  user: IUser;
  setUser: Dispatch<React.SetStateAction<IUser | undefined>>
}

const UserContext = createContext<IUserContext>({});
export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  axios.defaults.baseURL = 'http://192.168.0.113:3000/api';
  const [user, setUser] = useState<IUser | undefined>();
  axios.defaults.headers.common['Authorization'] = user && user.token
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
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
export default UserContext;
