import useSearchProducts from '../../hooks/useSearchProducts';
import { Link } from 'react-router-dom';
import SikaSäkissä  from '../../assets/SikaSäkissä.webp';

const SearchResultsPage = () => {
    const { loading, productData } = useSearchProducts();
    const renderFilteredProductInformation = () => {
        console.log(productData)
        const filteredProducts  = productData.filter((product) => { return product.name = searchedProduct})
        console.log(filteredProducts)
        return (
          filteredProducts.map((product) => (
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
    <div>SearchResultsPage

<div className='product-grid'>
            {renderFilteredProductInformation()}
         </div>
    </div>
  )
}

export default SearchResultsPage