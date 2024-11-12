import CreatePage from './components/Pages/CreatePage';
import HomePage from './components/Pages/HomePage';
import DetailsPage from './components/Pages/DetailsPage';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import EditPage from './components/Pages/EditPage';
import LoginPage from './components/Pages/LoginPage';
import SearchResultsPage from './components/Pages/SearchResultsPage';
import CreateUserPage from './components/Pages/CreateUserPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage loggedIn={loggedIn} setLoggedIn={setLoggedIn}  />} />
        <Route path="/login" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn}  />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path ="/create" element={<CreatePage />} />
        <Route path ="/create/user" element={<CreateUserPage />} />
        <Route path ='/details/:id' element={<DetailsPage />} />
        <Route path ='/edit/:id' element={<EditPage />} />
      </Routes>
      </div>
  )
}

export default App
