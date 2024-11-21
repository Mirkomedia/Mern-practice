import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from '../InputField'
import CreateUser from '../../assets/CreateUser.svg'
import InsiteLink from '../InsiteLink'
import axios from '../../Utils/axiosInstance';

const LoginPage = ({ setLoggedIn, setCurrentUser }) => {
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
        navigate("/"); // Navigate to the home page
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
  

  /* 
  const handleLogIn = async () => {
    try {
      // Use the configured axios instance to make the GET request
      const response = await axios.get('/api/users/', );  // Note: Base URL is already set in axiosInstance

      const data = response.data || {};  // Ensure response structure is correct
      const users = data.data || [];  // Adjust according to the response structure
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
        console.log(loggingUser);
        setCurrentUser(loggingUser);
      } else {
        console.log('Incorrect password, speak friend and enter');
        window.alert('Incorrect password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
 */
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
        />
        <button className='create-button' onClick={handleLogIn}>Login</button>
      </div>
    </div>
  );
}

export default LoginPage;
