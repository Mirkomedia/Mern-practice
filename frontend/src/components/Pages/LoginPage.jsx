import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../InputField'
import CreateUser from '../../assets/CreateUser.svg'
import InsiteLink from '../InsiteLink'
const LoginPage = ({ setLoggedIn, loggedIn }) => {

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const navigate = useNavigate()

const handleLogIn = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/`,{
      method: 'GET',
      headers: {  'Content-Type' : 'application/json'
    }} )
    const data = await response.json()
    const users = data.data || [];
    console.log(users)
    const loggingUser = users.filter((user) => { return user.name === username})
    console.log(loggingUser)
    if(loggingUser[0].password === password){
      navigate('/')
      setLoggedIn(true)
    }

  } catch (error) {
    console.log('Error logging in')
  }
}
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