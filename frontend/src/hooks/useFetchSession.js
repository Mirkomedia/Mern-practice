import { useState, useEffect } from "react";
import axios from "axios";

const useFetchSession = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get("/api/session", { withCredentials: true });

        if (response.data?.loggedIn) {
          console.log("Logged-in user:", response.data.user);
          setLoggedIn(true);
          setCurrentUser(response.data.user); // Update currentUser
        } else {
          console.log("User is not logged in.");
          setLoggedIn(false);
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
