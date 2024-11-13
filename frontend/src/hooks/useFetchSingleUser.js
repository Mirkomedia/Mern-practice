import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
const useFetchSingleUser = () => {
    const { id } = useParams(); // Retrieve the `id` parameter from the URL
    const [loading, setLoading] = useState(true);
    const [UserData, setUserData] = useState(null); // Initialize as `null` for a single User object
    
    useEffect(() => {
       const fetchUser = async () => {
         setLoading(true);
         try {
           const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${id}`);
           const data = await response.json();
           
           if (!response.ok) {
             window.alert('Error retrieving data');
           } else {
             console.log(data.data);
             setUserData(data.data); // Expecting `data.data` to contain the single User object
             setLoading(false);
           }
         } catch (error) {
           console.log('Error fetching data', error);
           setLoading(false);
         }
       };
       fetchUser();
     }, [id]);
 
     return { loading, UserData, id };
}

export default useFetchSingleUser