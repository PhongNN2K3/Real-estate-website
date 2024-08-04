import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketIoContext = createContext();

export const SocketIoProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [socketIo, setSocketIo] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:4000");
    setSocketIo(socket);
  }, []);

  useEffect(() => {
    currentUser && socketIo?.emit("newUser", currentUser.id);
  }, [currentUser, socketIo]);

  return (
    <SocketIoContext.Provider value={{ socketIo }}>
      {children}
    </SocketIoContext.Provider>
  );
};
