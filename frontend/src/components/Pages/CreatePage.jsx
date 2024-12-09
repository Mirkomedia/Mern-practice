import '../Styles/CreatePage.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../InputField'
import useFetchSession from '../../hooks/useFetchSession.js'

const CreatePage = () => {
  const { loggedIn, currentUser } = useFetchSession();
  const user = loggedIn ? currentUser._id : null; // Use session user's _id
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    user: user, // Attach user._id here
    locked: false
  });

  const handleAddProduct = async () => {
    try {
      const locked = loggedIn ? true : false;
      console.log("User value:", user);

      const productWithUser = { ...newProduct, user, locked };
      console.log("Product with user:", productWithUser);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productWithUser),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Product created successfully', data);
      const id = data.data._id
      // Reset form and show confirmation
      setNewProduct({
        name: "",
        price: "",
        image: "",
        description: "",
        user: user, // Reset user._id
      });
      window.alert('Product created');
      navigate(`/edit/${id}`)
    } catch (error) {
      console.error("Error creating product:", error);
      window.alert('Error creating product');
    }
  };
  if (loggedIn === undefined) {
    return <div>Loading...</div>; // Or a suitable loader
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

        <textarea
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className='description-box'
          placeholder='Write a description about your product'
          rows="5" maxLength={500}
        />

        <button id='create-button' className='create-button' onClick={handleAddProduct}>
          Submit
        </button>

        <Link className='link-to-home' to={`${import.meta.env.VITE_API_BASE_URL}`}>See all products</Link>
      </div>
    </div>
  );
};

export default CreatePage;
