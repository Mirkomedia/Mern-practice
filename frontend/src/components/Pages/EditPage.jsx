import '../Styles/DetailsPage.css';
import useFetchSingleProduct from '../../hooks/useFetchSingleProduct';
import SikaSäkissä  from '../../assets/SikaSäkissä.webp';
import { useState, useEffect } from 'react'
import InputField from '../InputField'
import EditPlume from '../../assets/EditPlume.svg';
import { Link, Route, Routes  } from 'react-router-dom';
const DetailsPage = () => {
    
     
   const { loading, productData, id} = useFetchSingleProduct();
   const [editProduct, setEditProduct] = useState({}); 
   useEffect(() => {
    if (productData) {
       setEditProduct(productData);
    }
 }, [productData]); // This runs when productData changes
    

   const renderProductInformation = () => {
      if (!editProduct) return <p>Product not found.</p>;
     
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

   const handleEditProduct = async () =>{
    try{
    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
       method: "PUT",
       headers: {
          'Content-Type' : 'application/json'
       },
       body : JSON.stringify(editProduct) 
    })
    if(!response.ok){
    throw new Error(`Error: ${response.statusCode}`);
 }const data = await response.json();
 console.log('Product updated succesfully', data)
 window.alert('Product updated')

    }catch (error){
       console.log('Error creating product', error)
       window.alert('Error creating product')
    }
 }
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
      onClick={handleEditProduct}>Submit</button>
         < Link to={`/`}>Back to catalogue  </Link>

      </div>
      </div>
   );
};

export default DetailsPage;
