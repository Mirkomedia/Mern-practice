import '../Styles/HomePage.css';
import { Link, Route, Routes  } from 'react-router-dom';
import useFetchProducts from '../../hooks/useFetchProducts';
import SikaSäkissä  from '../../assets/SikaSäkissä.webp';

const HomePage = () => {
   const { loading, productData } = useFetchProducts();
   const renderProductInformation = () => {
      return (
         productData.map((product) => (
            <div key={product._id} className='product-box'>
               <img className='product-image' alt='product' src={product.image} 
               onError={(e) => {
      e.target.onerror = null; // Prevent infinite loop if the fallback image also fails
      e.target.src = SikaSäkissä; // Set the fallback image
    }} />
               <div className='product-details'>
               <Link to={`/details/${product._id}`}>{product.name}</Link>
                  <p className="product-price">${product.price.toFixed(2)}</p>
               </div>
            </div>
         ))
      );
   }

   if (loading) {
      return <p>Loading...</p>;
   }

   return (
      <div className="homepage">
         <div className='header-box'>
         <h1>
            Bazaar 
         </h1>
         <a  href="http://localhost:5000/create">Create your own product!</a>
         </div>
         <div className='product-grid'>
            {renderProductInformation()}
         </div>
      </div>
   );
}

export default HomePage;
