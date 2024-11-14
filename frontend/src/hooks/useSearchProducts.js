import { useState, useEffect } from 'react'
 
const useSearchProducts = () => {
    const [loading, setLoading] = useState(true);
    const [productData, setProductData] = useState([]);
    
    useEffect(() => {
       const searchProducts = async () => {
         setLoading(true);
         try {
           const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/`);
           const data = await response.json();
           const products = data.data || []; // Adjusting in case 'data' is already an array
           
           if (!response.ok) {
             window.alert('Error retrieving data');
           } else {
             console.log(products);
             setProductData(products);
             setLoading(false);
           }
         } catch (error) {
           console.log('Error fetching data', error);
           setLoading(false);
         }
       };
       searchProducts();
     }, []);
 
 
    
    return { loading, productData };
  
}

export default useSearchProducts