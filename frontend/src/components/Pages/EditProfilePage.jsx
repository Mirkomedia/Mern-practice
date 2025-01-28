import React from 'react'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from '../InputField'
import axios from '../../Utils/axiosInstance';
import PalauteBoksi from '../PalauteBoksi';

const CreateUserPage = ({ loggedIn, setLoggedIn, setCurrentUser, currentUser }) => {
const [newUser, setNewUser] = useState({
  name: "",
  email: "",
  phoneNumber: "",
  alternativeContact: "",
  password: "",
 /* remove comment if you add descriptions  description: "", */
  role: 'user'

 }); 

const navigate = useNavigate();

const handleAddUser = async () => {
  try {
    // Step 1: Create the new user
    const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/users/`, newUser, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }

    const createdUserData = response.data?.data; // Extract user data from response
    console.log("Response Data:", response.data);
    console.log("User updated successfully", createdUserData);

    const userId = createdUserData?._id; // Ensure user ID is available
    if (!userId) {
      throw new Error("User ID is missing from the response");
    }
    console.log("Extracted user ID", userId);
    window.alert("User created successfully");

    // Reset form fields
    setNewUser({
      name: "",
      email: "",
      phoneNumber: "",
      alternativeContact: "",
      password: "",
    });

    // Redirect to home page
    navigate("/profile");

  } catch (error) {
    console.log("Error creating User:", error.message);
    window.alert(error.message);
  }
};



  return (
    <div>
      <div className='grid-container' >
 
         <h1>Edit your profile</h1>
         <InputField
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        type="text"
        placeholder="Username"
        name="name"
      />
     <InputField
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser,  password: e.target.value })}
        type="password"
        placeholder="password"
        name="password"
      />
    
      <InputField
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        type="text"
        placeholder="User email"
        name="email"
      />  
      <InputField
        value={newUser.phoneNumber}
        onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
        type="text"
        placeholder="phonenumber"
        name="phoneNumber"
      />
        <InputField
        value={newUser.alternativeContact}
        onChange={(e) => setNewUser({ ...newUser,   alternativeContact: e.target.value })}
        type="text"
        placeholder="alternative contact"
        name="alternativeContact"
      />
       
{/* if I ever implement descriptions       <textarea value={newUser.description} onChange={(e) => setNewUser({ ...newUser, description: e.target.value })}
      className='description-box' placeholder='Write a short description about yourself'
      rows="3" maxLength={500}/>

      */}
     
      <button  id='create-button' className='create-button' 
      onClick={handleAddUser}>Submit</button>
        </div>
      </div>
  )}

export default CreateUserPage