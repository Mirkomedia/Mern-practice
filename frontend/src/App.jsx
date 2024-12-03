import CreatePage from './components/Pages/CreatePage';
import HomePage from './components/Pages/HomePage';
import DetailsPage from './components/Pages/DetailsPage';
import { Route, Routes } from 'react-router-dom';
import EditPage from './components/Pages/EditPage';
import LoginPage from './components/Pages/LoginPage';
import SearchResultsPage from './components/Pages/SearchResultsPage';
import CreateUserPage from './components/Pages/CreateUserPage';
import ProfilePage from './components/Pages/ProfilePage';
import PalautePage from './components/Pages/PalautePage';
import useFetchSession from './hooks/useFetchSession';


function App() {
  const { loggedIn, currentUser, setLoggedIn, setCurrentUser } = useFetchSession();


  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage loggedIn={loggedIn} setLoggedIn={setLoggedIn}  currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/login" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser}  />} />
        <Route path="/palaute" element={<PalautePage  loggedIn={loggedIn} setLoggedIn={setLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/search" element={<SearchResultsPage  loggedIn={loggedIn} setLoggedIn={setLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path ="/create" element={<CreatePage  loggedIn={loggedIn} setLoggedIn={setLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path ="/create/user" element={<CreateUserPage  loggedIn={loggedIn} setLoggedIn={setLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path ='/details/:id' element={<DetailsPage  loggedIn={loggedIn} setLoggedIn={setLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path ='/profile/:id' element={<ProfilePage  loggedIn={loggedIn} setLoggedIn={setLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path ='/edit/:id' element={<EditPage  loggedIn={loggedIn} setLoggedIn={setLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
       
      </Routes>  
      </div>
  )
}

export default App
