import { Link } from 'react-router-dom';
const InsiteLink = ({  image, name, linkTo }) => {
  return (
    <div>
   
     < Link to={linkTo}>  
     <div className='flex-wrapper'>
           <img className='icon' src={image} 
            alt={name + 'icon'}  height={40} width={40} />
           <span>{name}</span>
            </div>
     </Link>
    

    </div>
  )
}

export default InsiteLink