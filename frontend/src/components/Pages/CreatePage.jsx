import '../Styles/CreatePage.css'
import { useState, useEffect } from 'react'
import InputField from '../InputField'
const CreatePage = () => {
  
 const [newProduct, setNewProduct] = useState({
  name: "",
  price: "",
  image: "",
  description: ""
 }); 
 const [showPreview, setShowPreview] = useState(false);


const closePreview = () => {
  setShowPreview(false); // Hide preview modal
}
const handleAddProduct = async () =>{
   try{
   const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/`, {
      method: "POST",
      headers: {
         'Content-Type' : 'application/json'
      },
      body : JSON.stringify(newProduct) 
   })
   if(!response.ok){
   throw new Error(`Error: ${response.statusCode}`);
}const data = await response.json();
console.log('Product created succesfully', data)
window.alert('Product created')
setShowPreview(true)
setNewProduct({
  name: "",
  price: "",
  image: "",
  description: ""
 })
   }catch (error){
      console.log('Error creating product', error)
      window.alert('Error creating product')
   }
}


  return (
    <div>
      <div className='grid-container' >
 
         <h1>Create a new product</h1>
         <InputField
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        type="text"
        placeholder="Product Name"
        name="name"
      />

      <InputField
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        type="text"
        placeholder="Product Price"
        name="price"
      />

      <InputField
        value={newProduct.image}
        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        type="text"
        placeholder="Image URL"
        name="image"
      />
      
      <textarea value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
      className='description-box' placeholder='Write a descirption about your product'
      rows="5" maxLength={500}/>

     
      <button  id='create-button' className='create-button' 
      onClick={handleAddProduct}>Submit</button>
         
      
       {/* {showPreview && (
        <div className="modal-overlay" onClick={closePreview}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Product Preview</h3>
            <div className="product-box">
              <img className="product-image" alt="Product preview" src={newProduct.image} />
              <p>{newProduct.name}</p>
              <p>{newProduct.price}</p>
              <div className='icon-container'>
               <img className='edit-plume' src={EditPlume} alt='editIcon'  height={24} width={24} />
              </div>
            </div>
            <button className="close-button" onClick={closePreview}>Close</button>
            </div>
      </div>
      )} */}
       <a className='link-to-home' href="http://localhost:5000">See all products</a>
      </div>
      </div>
    
       )}       


export default CreatePage