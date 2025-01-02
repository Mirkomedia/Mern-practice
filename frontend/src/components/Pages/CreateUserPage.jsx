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
    // Step 1: Create the new user
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/`, newUser, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 201) {
      throw new Error(`Error: ${response.status}`);
    }

    const createdUserData = response.data?.data; // Extract user data from response
    console.log("Response Data:", response.data);
    console.log("User created successfully", createdUserData);

    const userId = createdUserData?._id; // Ensure user ID is available
    if (!userId) {
      throw new Error("User ID is missing from the response");
    }
    console.log("Extracted user ID", userId);

    // Step 2: Log in the user
    const loginResponse = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/users/login`,
      { name: newUser.name, password: newUser.password }, // Ensure correct payload
      { withCredentials: true } // Send cookies with the request
    );

    if (loginResponse.status !== 200) {
      throw new Error(`Login failed: ${loginResponse.status}`);
    }
    console.log("Login successful");

    setLoggedIn(true); // Update state after successful login

    // Step 3: Fetch user details
    const userResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}`, {
      withCredentials: true,
    });

    if (userResponse.status !== 200) {
      throw new Error("Error retrieving user data");
    }

    const userData = userResponse.data;
    console.log("Fetched user data:", userData);

    // Step 4: Update the current user state and notify success
    setCurrentUser(userData);
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
    navigate("/");
  } catch (error) {
    console.log("Error creating User:", error.message);
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