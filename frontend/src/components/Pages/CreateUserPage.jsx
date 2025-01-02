import React from 'react'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from '../InputField'
import axios from '../../Utils/axiosInstance';

const CreateUserPage = ({ loggedIn, setLoggedIn, setCurrentUser, currentUser }) => {
const [newUser, setNewUser] = useState({
  name: "",
  email: "",
  phoneNumber: "",
  alternativeContact: "",
  password: "",
  role: 'user'

 }); 

const navigate = useNavigate();

const handleAddUser = async () => {
  try {
    const response = await axios.post("https://mern-practice-0lqg.onrender.com/api/users/", o, {
      headers: { "Content-Type": "application/json" },
    });

    // Correctly check for status 201
    if (response.status !== 201) {
      throw new Error(`Error: ${response.status}`);
    }

    const createdUserData = response.data?.data; // Access the data object inside the response
    console.log("User created successfully:", createdUserData);

    const userId = createdUserData?._id; // Extract _id
    if (!userId) {
      throw new Error("User ID is missing from the response.");
    }
    console.log("Extracted User ID:", userId);

    // Fetch the created user's details
    const userResponse = await axios.get(`https://mern-practice-0lqg.onrender.com/api/users/${userId}`, {
      withCredentials: true,
    });

    if (userResponse.status !== 200) {
      throw new Error("Error retrieving user data");
    }

    const userData = userResponse.data;
    console.log("Fetched user data:", userData);

    // Set the current user and update logged-in state
    setCurrentUser(userData);
    setLoggedIn(true);

    // Log in the user
    await axios.post(
      "https://mern-practice-0lqg.onrender.com/api/users/login",
      { name: o.name, password: o.password },
      { withCredentials: true }
    );

    // Notify and reset the form
    window.alert("User created");
    setNewUser({
      name: "",
      email: "",
      phoneNumber: "",
      alternativeContact: "",
      password: "",
    });

    navigate("/"); // Redirect to home page
  } catch (error) {
    console.error("Error creating User:", error);
    window.alert("Error creating User");
  }
};





  return (
    <div>
      <div className='grid-container' >
 
         <h1>Create a new User</h1>
         <InputField
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        type="text"
        placeholder="Username"
        name="name"
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
       <InputField
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser,  password: e.target.value })}
        type="password"
        placeholder="password"
        name="password"
      />
    
     
      <button  id='create-button' className='create-button' 
      onClick={handleAddUser}>Submit</button>
        </div>
      </div>
  )}

export default CreateUserPage