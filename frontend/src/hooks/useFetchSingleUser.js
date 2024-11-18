import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useFetchSingleUser = () => {
  const { id } = useParams(); // Retrieve the `id` parameter from the URL
  const [loading, setLoading] = useState(true);
  const [UserData, setUserData] = useState(null); // Initialize as `null` for a single User object

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/${id}`,
          { withCredentials: true }
        );
        const data = response.data;

        if (!response.status === 200) {
          window.alert("Error retrieving data");
        } else {
          console.log(data.data);
          setUserData(data.data); // Expecting `data.data` to contain the single User object
        }
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  return { loading, UserData, id };
};

export default useFetchSingleUser;
