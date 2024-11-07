import CreatePage from './components/Pages/CreatePage';
import HomePage from './components/Pages/HomePage';
import DetailsPage from './components/Pages/DetailsPage';
import { Route, Routes, Link, } from 'react-router-dom';
import EditPage from './components/Pages/EditPage';


function App() {


  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path ="/create" element={<CreatePage />} />
        <Route path ='/details/:id' element={<DetailsPage />} />
        <Route path ='/edit/:id' element={<EditPage />} />
      </Routes>
      </div>
  )
}

export default App
