import '../Styles/DetailsPage.css';
import useFetchSingleUser from '../../hooks/useFetchSingleUser';
import { Link } from 'react-router-dom'; 
const ProfilePage = () => {
  const { loading, UserData, id } = useFetchSingleUser();

  const renderUserInformation = () => {
    if (!UserData) return <p>User not found.</p>;

    return (
      <div className='product-box'>
        <div className='product-details'>
          <p className="product-name"><strong>Name:</strong> {UserData.name}</p>
          <p><strong>Email:</strong> {UserData.email || 'Not provided'}</p>
          <p><strong>Phone Number:</strong> {UserData.phonenumber || 'Not provided'}</p>
          <p><strong>Alternative Contact:</strong> {UserData.alternativeContact || 'Not provided'}</p>
          <p><strong>Created At:</strong> {new Date(UserData.createdAt).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(UserData.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='product-container'>
      <h1>Details for User ID: {id}</h1>
      <div>
        {renderUserInformation()}
      </div>
      <Link to={`/`}>Back to catalogue</Link>
    </div>
  );
};

export default ProfilePage;
