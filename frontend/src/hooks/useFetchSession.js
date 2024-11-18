import axios from "axios"
import { useState, useEffect } from "react";


const useFetchSession = () =>{

    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get("/api/session", { withCredentials: true });
        const { loggedIn, user } = response.data;

        setLoggedIn(loggedIn);
        if (loggedIn) {
          setCurrentUser(user);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []);
  return { loggedIn, currentUser };
}
export default useFetchSession
