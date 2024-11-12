import '../Styles/HomePage.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFetchProducts from '../../hooks/useFetchProducts';
import SikaSäkissä  from '../../assets/SikaSäkissä.webp';
import PlusIcon from '../../assets/PlusIcon.svg'
import ProfileIcon from '../../assets/ProfileIcon.svg'
import InsiteLink from '../InsiteLink';
import SearchInput from '../SearchInput';
import FilteredProducts from '../FilteredProducts';

const HomePage = ({ loggedIn, setLoggedin }) => {
   const [filtered, setFiltered] = useState(false)
   const { loading, productData } = useFetchProducts();
   const [searchedProduct, setSearchedProduct] = useState('')
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
            <div className='header-links-container'>
         <h1>
            Bazaar 
         </h1>
         <InsiteLink 
         name= {loggedIn === false ? 'Login' : 'View profile'}
         image={ProfileIcon}
         linkTo='/login'
         />
         <InsiteLink
         name='Create your own product'
         image={PlusIcon}
         linkTo='/create'/>
         </div>
         <SearchInput searchedProduct={searchedProduct}
          setSearchedProduct={setSearchedProduct}
          setFiltered={setFiltered}/>
         </div>
         {filtered === false &&
          <div className='product-grid'>
            {renderProductInformation()}
         </div>}
         {filtered === true && 
         <div className='product-grid'>
           <FilteredProducts
           searchedProduct={searchedProduct}
           />
         </div>}
      </div>
                );}
      

export default HomePage;
