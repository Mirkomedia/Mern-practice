import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from '../InputField'

const CreateUserPage = () => {
const [newUser, setNewUser] = useState({
  name: "",
  email: "",
  phoneNumber: "",
  alternativeContact: "",
  password: ""

 }); 

const navigate = useNavigate();

const handleAddUser = async () =>{
   try{
   const response = await fetch("http://localhost:5000/api/users/", {
      method: "POST",
      headers: {
         'Content-Type' : 'application/json'
      },
      body : JSON.stringify(newUser) 
   })
   if(!response.ok){
   throw new Error(`Error: ${response.statusCode}`);
}const data = await response.json();
console.log('User created succesfully', data)
window.alert('User created')
setNewUser({
    name: "",
    email: "",
    phoneNumber: "",
    alternativeContact: "",
    password: ""  
 })
 navigate('/')
   }catch (error){
      console.log('Error creating User', error)
      window.alert('Error creating User')
   }
}


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
        type="text"
        placeholder="password"
        name="password"
      />
    
     
      <button  id='create-button' className='create-button' 
      onClick={handleAddUser}>Submit</button>
        </div>
      </div>
  )}

export default CreateUserPage