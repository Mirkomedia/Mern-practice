import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation}  from "react-router-dom"

const useFetchSession = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
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
  }, [location.pathname]);

  return { loggedIn, setLoggedIn, currentUser, setCurrentUser }; // Include all states and setters
};

export default useFetchSession;
