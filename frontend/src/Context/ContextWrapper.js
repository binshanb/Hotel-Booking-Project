import React, { useState } from "react";
import { MyContext } from "./Context"; // Import your context (adjust the path as needed)
import { useNavigate } from "react-router-dom";

const ContextWrapper = ({ children }) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    user_id: "",
    // ... other context values
  });

  const handleChangeUsername = (newUsername) => {
    setState({ ...state, username: newUsername });
  };

  return (
    <MyContext.Provider
      value={{
        state,
        changeUsername: handleChangeUsername,
        // ... other context functions or values
        navigate, // Provide the navigate function to the context
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default ContextWrapper;
