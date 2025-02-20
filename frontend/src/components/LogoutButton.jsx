import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Utils/axiosInstance";
import LogoutIcon from '../assets/LogoutIcon.svg'

const LogoutButton = ({ setLoggedIn, setCurrentUser }) => {
  const navigate = useNavigate();
  const logoutUser = async (setLoggedIn, setCurrentUser) => {
    try {
      const response = await axios.post(
        `/api/users/logout`,
        {}, // Empty body for POST request
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        // Reset application state
        setLoggedIn(false);
        setCurrentUser(null);
  
        // Redirect to login or home page
        window.alert("Logged out successfully!");
      } else {
        console.error("Failed to log out:", response.data.message);
        window.alert(response.data.message || "Error during logout.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      window.alert(error.response?.data?.message || "Error logging out.");
    }
  };
  const handleLogout = async () => {
    await logoutUser(setLoggedIn, setCurrentUser);
    navigate("/"); 
  };

  return (

     <div className="logout" onClick={handleLogout}>
        <img className="logout-icon" src={LogoutIcon} alt="logoutIcon" height={40} width={40}/>
        <p>logout</p>
    </div>
   
  );
};

export default LogoutButton;
