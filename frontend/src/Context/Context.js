
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import instance from "../utils/Axios";

export const RoomContext= createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/admin/room-list/");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching room list:", error);
      }
    };

    fetchData();
  }, []);

  const contextValue = {
    rooms,
  };
  return (
  <RoomContext.Provider value={{ rooms, setRooms }}>
  {children}
</RoomContext.Provider>
);
};
export default RoomProvider;

