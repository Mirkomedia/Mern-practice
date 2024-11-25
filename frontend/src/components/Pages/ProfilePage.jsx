import '../Styles/DetailsPage.css';
import useFetchSingleUser from '../../hooks/useFetchSingleUser';
import { Link } from 'react-router-dom'; 
import ArrowLeft  from '../../assets/ArrowLeft.png';
const ProfilePage = () => {
  const { loading, UserData, id } = useFetchSingleUser();

  const renderUserInformation = () => {
    if (!UserData) return <p>User not found or you don't have the right o' you don't have the right</p>;

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
      <div className='detail-grid'>
      < Link className='back-catalogue' to={`/`}
         ><img className='back-arrow icon' src={ArrowLeft} width={60} height={60}/></Link>
        {renderUserInformation()}
       </div>
    </div>
  );
};

export default ProfilePage;
