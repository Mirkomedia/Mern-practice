import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from '../InputField'
import CreateUser from '../../assets/CreateUser.svg'
import InsiteLink from '../InsiteLink'

import axios from '../../Utils/axiosInstance';

const LoginPage = ({ setLoggedIn, loggedIn, currentUser, setCurrentUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleLogIn = async () => {
    try {
      const response = await axios.post(
        '/api/users/login',
        { username, password },
        { withCredentials: true }
      );
  
      console.log("Response data:", response.data);
  
      if (response.data.message === "Logged in successfully") {
        window.alert('Signed in successfully');
        setCurrentUser(response.data.user);
        setLoggedIn(true);
        navigate('/')
      } else {
        // Handling unexpected response format or unsuccessful login attempt
        window.alert("You are not registered, please sign up");
        navigate("/create/user"); // Navigate to the sign-up page
      }
    } catch (error) {
      console.error("Login error details:", error); // Log the full error object for debugging
  
      // Log different parts of the error object to see the structure clearly
      if (error.response) {
        console.error("Error response:", error.response);
      }
      window.alert("Login failed, please try again.");
    }
  };
  const handleKeyDown = (event) =>{ 
    if(event.key === 'Enter')
    handleLogIn;
}
  return (
    <div>
      <div className='grid-container'>
        <h1>
          Log in or <InsiteLink 
            name='Create an account' 
            image={CreateUser}
            linkTo='/create/user'
          />
        </h1>
        <InputField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          name="username"
          
        />
        <InputField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"  // Use 'password' type to hide input
          placeholder="Password"
          name="password"
          onKeyDown={handleKeyDown} 
        />
        <button className='create-button' onClick={handleLogIn}>Login</button>
      </div>
    </div>
  );
}

export default LoginPage;
