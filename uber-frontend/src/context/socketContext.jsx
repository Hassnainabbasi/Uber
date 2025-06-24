import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import BASE_URL from "../../constant";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [socketInstance, setSocketInstance] = useState(null);


  useEffect(() => {
    socketRef.current = io(`${BASE_URL}`, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current.id);
      setSocketInstance(socketRef.current);
    });

    socketRef.current.on("disconnect", () => {  
      console.log("Socket disconnected");
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (eventName, data) => {
    if (socketRef.current) {
      socketRef.current.emit(eventName, data);
    }
  };

  const receiveMessage = (eventName, callback) => {
    if (socketRef.current) {
      socketRef.current.on(eventName, callback);
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.off(eventName, callback);
      }
    };
  };

  return (
    <SocketContext.Provider
      value={{ sendMessage, receiveMessage, socket: socketInstance }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
