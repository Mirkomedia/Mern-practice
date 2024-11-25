import { useState, useEffect } from "react";
import axios from "axios";

const useFetchSession = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get("/api/session");
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

  return { loggedIn, setLoggedIn, currentUser, setCurrentUser }; // Include all states and setters
};

export default useFetchSession;
