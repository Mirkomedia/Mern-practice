import '../Styles/DetailsPage.css';
import useFetchSingleUser from '../../hooks/useFetchSingleUser';
import { Link } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import ArrowLeft from '../../assets/ArrowLeft.png';
import SikaSäkissä from '../../assets/SikaSäkissä.webp';
import useFetchProducts from '../../hooks/useFetchProducts';
import ProfileIcon from '../../assets/ProfileIcon.svg'
import EditPlume from '../../assets/EditPlume.svg'
const ProfilePage = () => {
  const { UserData, id } = useFetchSingleUser(); // Fetch single user data
  const { loading, productData } = useFetchProducts(); // Fetch all products
  const [userProducts, setUserProducts] = useState([]);

  const renderUserInformation = () => {
    if (!UserData) return <p>User not found or you don't have the right to view this profile.</p>;

    return (
      <div className='user-box'>
         <img className='profile-picture' alt='profile-picture' src={ProfileIcon}/>
        <div className='product-details'>
          <p className="product-name"><strong>Name:</strong> {UserData.name}</p>
          <p><strong>Email:</strong> {UserData.email || 'Not provided'}</p>
          <p><strong>Phone Number:</strong> {UserData.phonenumber || 'Not provided'}</p>
          <p><strong>Alternative Contact:</strong> {UserData.alternativeContact || 'Not provided'}</p>
          <p><strong>Created At:</strong> {new Date(UserData.createdAt).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(UserData.updatedAt).toLocaleString()}</p>
          <p><strong>Role:</strong> {UserData.role || 'Not provided'}</p>
          <p><strong>Description:</strong></p>
        </div>
        <div className='useless-wrapper'>
        <div className='icon-container'>
        <Link to={`/profile/edit/${id}`}>
                     <img
                        className="edit-plume"
                        src={EditPlume}
                        alt="editIcon"
                        height={24}
                        width={24}
                     />
                     Edit
                  </Link>
          </div>
          </div>
      </div>
    );
  };

  useEffect(() => {
    if (UserData?._id && productData.length > 0) {
      // Filter products safely
      const filteredProducts = productData.filter((product) => {
        if (!product.user || !UserData._id) {
          return false; // Skip products with missing user field
        }
        return product.user._id.toString() === UserData._id.toString();
      });
      setUserProducts(filteredProducts);
    }
  }, [UserData, productData]);
  

  const renderUserProducts = () => {
    if (loading) {
      return <p>Loading products...</p>;
    }

    if (userProducts.length === 0) {
      return <p>No products found for this user.</p>;
    }

    return userProducts.map((product) => (
    <div className=''>
      <div key={product._id} className="product-box">
        <img
          className="product-image"
          alt="product"
          src={product.image}
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop if fallback fails
            e.target.src = SikaSäkissä; // Set fallback image
          }}
        />
        <div className="product-details">
          <Link to={`/details/${product._id}`}>{product.name}</Link>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p>
            {product.description
              ? product.description.length > 50
                ? `${product.description.slice(0, 50)}...`
                : product.description
              : ''}
          </p>
        </div>
      </div>
      </div>
    ));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='profile-grid'>
      <h1>Details for User ID: {id}</h1>
      <div className='profile-product-grid'>
        <Link className='back-catalogue' to={`/`}>
          <img className='back-arrow icon' src={ArrowLeft} width={60} height={60} />
        </Link>
        {renderUserInformation()}
        <h1>Your Products</h1>
        <div className="user-products">{renderUserProducts()}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
