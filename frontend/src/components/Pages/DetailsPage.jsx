import '../Styles/DetailsPage.css';
import EditPlume from '../../assets/EditPlume.svg';
import useFetchSingleProduct from '../../hooks/useFetchSingleProduct';

const DetailsPage = () => {
   const { loading, productData, id } = useFetchSingleProduct();
   const renderProductInformation = () => {
      if (!productData) return <p>Product not found.</p>;

      return (
         <div className='product-box'>
            <img className='product-image' alt='product' src={productData.image} />
            <div className='product-details'>
               <p className="product-name">{productData.name}</p>
               <p className="product-price">${productData.price.toFixed(2)}</p>  
               <p className='product-description'>{productData.description}</p>            
            </div>
            <div className='icon-container'>
       <img className='edit-plume' src={EditPlume} alt='editIcon'  height={24} width={24} />
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
       <div>
         {renderProductInformation()}
         </div>
      </div>
   );
};

export default DetailsPage;
