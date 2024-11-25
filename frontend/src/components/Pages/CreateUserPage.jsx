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
  password: ""

 }); 

const navigate = useNavigate();

const handleAddUser = async () => {
  if (!newUser.name || !newUser.email || !newUser.password) {
    window.alert('Please fill in all required fields!');
    return;
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/` || 'http://localhost:5000', newUser, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    console.log('User created successfully', response.data);

    // Use the created user data
    const createdUser = response.data.data;
    setCurrentUser(createdUser);
    setLoggedIn(true);

    // Notify and reset the form
    window.alert('User created');
    setNewUser({
      name: "",
      email: "",
      phoneNumber: "",
      alternativeContact: "",
      password: "",
    });

    navigate('/');
  } catch (error) {
    console.error('Error creating user:', error);
    window.alert(error.response?.data?.message || 'Error creating user');
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