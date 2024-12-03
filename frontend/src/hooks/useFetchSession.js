import { useState, useEffect } from "react";
import axios from "axios";

const useFetchSession = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'Guest',
    role: 'Guest'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/session`,
          { withCredentials: true }
        );
        const { loggedIn, user } = response.data;

        setLoggedIn(loggedIn);
        setCurrentUser(loggedIn ? user : { name: 'Guest', role: 'Guest' });
      } catch (error) {
        console.error("Error fetching session:", error);
        setLoggedIn(false);
        setCurrentUser({ name: 'Guest', role: 'Guest' });
      } finally {
        setLoading(false); // Ensure loading is false after fetch
      }
    };

    fetchSession();
  }, []);

  return { loggedIn, currentUser, loading }; // Optionally include setters if needed
};

export default useFetchSession;
