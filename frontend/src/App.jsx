import CreatePage from './components/Pages/CreatePage';
import HomePage from './components/Pages/HomePage';
import DetailsPage from './components/Pages/DetailsPage';
import Navbar from "./components/Navbar"
import { Route, Routes } from 'react-router-dom';



function App() {


  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path ="/create" element={<CreatePage />} />
        <Route path ='/details/:id' element={<DetailsPage />} />
      </Routes>
      </div>
  )
}

export default App
