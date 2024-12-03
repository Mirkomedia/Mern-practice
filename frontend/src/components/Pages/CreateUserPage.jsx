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
    // Create the new user
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/`, newUser, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status !== 200) {
      throw new Error(`Error: ${response.status}`);
    }

    const createdUserData = response.data; // Assuming your API sends user data in response
    console.log('User created successfully', createdUserData);
    const userId = createdUserData._id; // Adjust based on your response structure
    console.log(userId);

    // Fetch the created user's details
    const userResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}`, {
      withCredentials: true // Now this is fine because we're fetching user details after creation
    });

    if (userResponse.status !== 200) {
      throw new Error('Error retrieving user data');
    }

    const userData = userResponse.data;
    console.log('Fetched user data:', userData);

    // Set the current user and update logged-in state
    setCurrentUser(userData);
    setLoggedIn(true);
    await axios.post(
      '/api/users/login',
      newUser.name, newUser.password ,
      { withCredentials: true }
    );

    // Notify and reset the form
    window.alert('User created');
    setNewUser({
      name: "",
      email: "",
      phoneNumber: "",
      alternativeContact: "",
      password: ""
    });

    navigate('/'); // Redirect to another page, like the home page
  } catch (error) {
    console.log('Error creating User:', error);
    window.alert('Error creating User');
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
        placeholder="User Name"
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
        placeholder="phoneNumber"
        name="phoneNumber"
      />
        <InputField
        value={newUser.alternativeContact}
        onChange={(e) => setNewUser({ ...newUser,   alternativeContact: e.target.value })}
        type="text"
        placeholder="alternativeContact"
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