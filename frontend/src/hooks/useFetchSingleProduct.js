import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
const useFetchSingleProduct = () => {
    const { id } = useParams(); // Retrieve the `id` parameter from the URL
    const [loading, setLoading] = useState(true);
    const [productData, setProductData] = useState(null); // Initialize as `null` for a single product object
    
    useEffect(() => {
       const fetchProduct = async () => {
         setLoading(true);
         try {
           const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`);
           const data = await response.json();
           
           if (!response.ok) {
             window.alert('Error retrieving data');
           } else {
             console.log(data.data);
             setProductData(data.data); // Expecting `data.data` to contain the single product object
             setLoading(false);
           }
         } catch (error) {
           console.log('Error fetching data', error);
           setLoading(false);
         }
       };
       fetchProduct();
     }, [id]);
 
     return { loading, productData, id };
}

export default useFetchSingleProduct