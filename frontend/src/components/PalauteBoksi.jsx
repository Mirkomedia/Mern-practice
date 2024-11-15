import { useState } from 'react'
import { Link } from 'react-router-dom';
import InsiteLink from './InsiteLink';
import FeedbackIcon from '../assets/FeedbackIcon.svg'

const PalauteBoksi = () => {
  
 const [newPalaute, setNewPalaute] = useState({
    palaute: ""
 }); 



const handleAddPalaute = async () =>{
   try{
   const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/palaute`, {
      method: "POST",
      headers: {
         'Content-Type' : 'application/json'
      },
      body : JSON.stringify(newPalaute) 
   })
   if(!response.ok){
   throw new Error(`Error: ${response.statusCode}`);
}const data = await response.json();
console.log('Palaute lähetetty', data)
window.alert('Palaute lähetetty')
setNewPalaute({
palaute: ""
 })
   }catch (error){
      console.log('Error creating palaute', error)
      window.alert('Error creating palaute')
   }
}


  return (
    <div>
      <div className='grid-container' >
 
      
      <textarea value={newPalaute.palaute} onChange={(e) => setNewPalaute({ ...newPalaute, palaute: e.target.value })}
      className='description-box' placeholder='Give feedback or call me a slur'
      rows="5" maxLength={1500}/>

     
      <button  id='create-button' className='create-button' 
      onClick={handleAddPalaute}>Submit</button>
       
     <InsiteLink
     image={FeedbackIcon}
     name='view feedback'
     linkTo={'/palaute'}/>
      </div>
      </div>
    
       )}       


export default PalauteBoksi