
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/admin/room-list/");
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching room list:", error);
      }
    };

    fetchData();
  }, []);

  const contextValue = {
    rooms,
    // Add other context properties as needed
  };

  return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};

export default MyContextProvider;

