import '../Styles/DetailsPage.css';
import useFetchSingleProduct from '../../hooks/useFetchSingleProduct';
import SikaSäkissä  from '../../assets/SikaSäkissä.webp';
import { useState, useEffect } from 'react'
import InputField from '../InputField'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import useFetchSession from '../../hooks/useFetchSession';
import DeleteIcon from '../../assets/DeleteIcon.svg'

const DetailsPage = () => {
    
   const { loggedIn, currentUser } = useFetchSession();
   const { loading, productData, id} = useFetchSingleProduct();
   const [editProduct, setEditProduct] = useState({}); 
   const isOwner = currentUser?._id && productData?.user?._id && currentUser._id === productData.user._id;
   const isAdmin = currentUser?.role === 'admin';
   const navigate = useNavigate();
   useEffect(() => {
    if (productData) {
       setEditProduct(productData);
    }
 }, [productData]); // This runs when productData changes

   const renderProductInformation = () => {
      if (!editProduct || productData === null) return <p>Product not found.</p>;
     
      return (
         <div className='product-box'>
            <img className='product-image' alt='product' src={editProduct.image} 
                onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop if the fallback image also fails
                e.target.src = SikaSäkissä; // Set the fallback image
                 }} />
            <div className='product-details'>
               <p className="product-name">{editProduct.name}</p>
               <p className="product-price">${editProduct.price}</p>  
               <p className='product-description'>{editProduct.description}</p>            
            </div>
          
         </div>
      );
   };

   if (loading) {
      return <p>Loading...</p>;
   }
   const handleEditProduct = async () => {
      if (isOwner || isAdmin) {
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`,
            {withCredentials: true},
            editProduct, // axios automatically stringifies JSON
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
    
          console.log('Product updated successfully', response.data);
          window.alert('Product updated');
        } catch (error) {
          // axios error handling
          if (error.response) {
            // Server responded with a status code outside the 2xx range
            console.error('Error creating product:', error.response.data);
            window.alert(`Error: ${error.response.status}`);
          } else if (error.request) {
            // Request was made but no response was received
            console.error('No response received:', error.request);
            window.alert('No response from server');
          } else {
            // Something else went wrong
            console.error('Error:', error.message);
            window.alert('An unexpected error occurred');
          }
        }
      } else {
        window.alert("You don't have the right to edit this product");
      }
    };
    const handleUnlockedEditProduct = async () => {
     
        try {
          const response = await axios.put(
            `${import.meta.env.VITE_API_BASE_URL}/api/products/${id}/unlocked`,
            editProduct, // axios automatically stringifies JSON
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
    
          console.log('Product updated successfully', response.data);
          window.alert('Product updated');
        } catch (error) {
          // axios error handling
          if (error.response) {
            // Server responded with a status code outside the 2xx range
            console.error('Error creating product:', error.response.data);
            window.alert(`Error: ${error.response.status}`);
          } else if (error.request) {
            // Request was made but no response was received
            console.error('No response received:', error.request);
            window.alert('No response from server');
          } else {
            // Something else went wrong
            console.error('Error:', error.message);
            window.alert('An unexpected error occurred');
          }
        }
   
    };
    const handleDeleteProduct = async () => {
      // Show confirmation popup
      const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    
      if (!isConfirmed) {
        return; // Exit if the user cancels
      }
    
      if   (loggedIn && (isOwner || isAdmin)) {
        try {
          const response = await axios.delete(
            `${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`,
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
    
          console.log('Product deleted', response.data);
          window.alert('Product deleted');
          navigate('/')
        } catch (error) {
          // Axios error handling
          if (error.response) {
            // Server responded with a status code outside the 2xx range
            console.error('Error deleting product:', error.response.data);
            window.alert(`Error: ${error.response.status}`);
          } else if (error.request) {
            // Request was made but no response was received
            console.error('No response received:', error.request);
            window.alert('No response from server');
          } else {
            // Something else went wrong
            console.error('Error:', error.message);
            window.alert('An unexpected error occurred');
          }
        }
      } else {
        window.alert("You don't have the right to delete this product");
      }
    };
    
   return (
    <div>
      <div  className='product-container'>
         <h1>Preview for {editProduct.name} ID: {id}</h1>
       <div>
         {renderProductInformation()}
         </div>
         </div>
         <div className='grid-container' >
 
         <h1>Edit product</h1>
         <div className='delete-wrapper' onClick={handleDeleteProduct} style={{
          display: 'inline-flex',
          alignItems: 'center'
         }}>
          <img className='delete-icon' alt='delete-icon' src={DeleteIcon} height={24} width={24}/>
         <h3 style={{
          color: '#B22222'
         }}>Delete Product</h3>
         </div>
         <InputField
        value={editProduct.name}
        onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
        type="text"
        placeholder="Product Name"
        name="name"
      />

      <InputField
        value={editProduct.price}
        onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
        type="text"
        placeholder="Product Price"
        name="price"
      />

      <InputField
        value={editProduct.image}
        onChange={(e) => setEditProduct({ ...editProduct, image: e.target.value })}
        type="text"
        placeholder="Image URL"
        name="image"
      />
      <textarea value={editProduct.description} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
      className='description-box' placeholder='Write a descirption about your product'
      rows="5" maxLength={500}/>
     
     <button  id='create-button' className='create-button' 
      onClick={productData?.locked === true ? handleEditProduct : handleUnlockedEditProduct}>Submit</button>
         < Link to={`/`}>Back to catalogue  </Link>

      </div>
      </div>
   );
};

export default DetailsPage;
