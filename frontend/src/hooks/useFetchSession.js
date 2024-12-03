import { useState, useEffect } from "react";
import axios from "axios";

const useFetchSession = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'Guest',
    role: 'Guest'
  });

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get("/api/session", { withCredentials: true });
        const { loggedIn, user } = response.data;

        setLoggedIn(loggedIn);
        if (loggedIn) {
          setCurrentUser(user);
        }else{
          setCurrentUser({
            name: 'Guest',
            role: 'Guest'
          })
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        setLoggedIn(false);
        setCurrentUser({
          name: 'Guest',
          role: 'Guest'
        });
      }
    fetchSession();
}}, []);

  return { loggedIn, setLoggedIn, currentUser, setCurrentUser }; // Include all states and setters
};

export default useFetchSession;
