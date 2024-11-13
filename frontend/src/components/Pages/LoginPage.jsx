import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../InputField'
import CreateUser from '../../assets/CreateUser.svg'
import InsiteLink from '../InsiteLink'
import bcrypt from 'bcryptjs'
const LoginPage = ({ setLoggedIn, loggedIn, currentUser, setCurrentUser }) => {

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const navigate = useNavigate()

const handleLogIn = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const data = await response.json();
    const users = data.data || [];
    console.log(users);

    // Find the user matching the entered username
    const loggingUser = users.find(user => user.name === username);

    if (!loggingUser) {
      console.log('User not found');
      window.alert('User not found');
      return;
    }

    // Compare entered password with stored hashed password
    const match = await bcrypt.compare(password, loggingUser.password);
    
    if (match) {
      console.log('Correct password, logged in');
      window.alert('Signed in successfully');
      navigate('/');
      setLoggedIn(true);
      console.log(loggingUser)
      setCurrentUser(loggingUser)
    } else {
      console.log('Incorrect password, speak friend and enter');
      window.alert('Incorrect password');
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
};
  return (
    <div>
      <div className='grid-container'>
       <h1>Log in or <InsiteLink 
         name='Create an account' 
         image={CreateUser}
         linkTo='/create/user'
         /></h1>
        <InputField
         value={username}
         onChange={(e) => setUsername(e.target.value)}
         type="text"
         placeholder="Username"
         name="username"/>
         <InputField
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         type="text"
         placeholder="Password"
         name="password"/>
         <button className='create-button' onClick={handleLogIn}>Login</button>

      </div>
    </div>
  )
}

export default LoginPage