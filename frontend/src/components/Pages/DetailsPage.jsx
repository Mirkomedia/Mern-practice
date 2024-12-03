import '../Styles/DetailsPage.css';
import EditPlume from '../../assets/EditPlume.svg';
import useFetchSingleProduct from '../../hooks/useFetchSingleProduct';
import SikaSäkissä  from '../../assets/SikaSäkissä.webp';
import ArrowLeft  from '../../assets/ArrowLeft.png';
import { Link} from 'react-router-dom';
import useFetchSession from '../../hooks/useFetchSession';
import DeleteIcon from '../../assets/DeleteIcon.svg'

const DetailsPage = () => {
   const { loading, productData, id } = useFetchSingleProduct();
   const { loggedIn, currentUser } = useFetchSession();
   const renderProductInformation = () => {
      if (!productData) return <p>Product not found.</p>;

      return (
         <div className='product-detail-box'>
            <img className='product-image' alt='product' src={productData.image} 
                onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop if the fallback image also fails
                e.target.src = SikaSäkissä; // Set the fallback image
                 }} />
            <div className='product-details'>
               <p className="product-name">{productData.name}</p>
               <p className="product-price">${productData.price.toFixed(2)}</p>  
               <p className='product-description'>{productData.description}</p>            
            </div>
            <div className='icon-container'>
           {loggedIn && currentUser.name === productData.user && < Link to={`/edit/${id}`}>  
            <img className='edit-plume' src={EditPlume} alt='editIcon'  height={24} width={24} />
            Edit
            </Link>}
            {!productData.locked && < Link to={`/edit/${id}`}>  
            <img className='edit-plume' src={EditPlume} alt='editIcon'  height={24} width={24} />
            Edit
            </Link>}
            {loggedIn && currentUser.role === 'admin' || currentUser.name === productData.user &&
             <Link to={`/delete/${id}`} >
               <img className='delete-icon' src={DeleteIcon} alt='deleteIcon'  height={24} width={24} />
               Delete</Link> }
          </div>
         </div>
      );
   };

   if (loading) {
      return <p>Loading...</p>;
   }

   return (
      <div  className='product-container'>
         <h1>Details for Product ID: {id}</h1>
       <div className='detail-grid'>
       < Link className='back-catalogue' to={`/`}
         ><img className='back-arrow icon' src={ArrowLeft} width={60} height={60}/></Link>
         {renderProductInformation()}
         </div> 
      </div>
   );
};

export default DetailsPage;
