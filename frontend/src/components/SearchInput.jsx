import { useEffect, useRef, useState} from 'react'
import SearchIcon from '../assets/SearchIcon.svg'

const SearchInput = ({ searchedProduct, setSearchedProduct, setFiltered}) => {


    const inputRef = useRef(null)

    
    const searchProduct = async () =>{
        if(inputRef.current && inputRef.current.value !== '')
        setSearchedProduct(inputRef.current.value)
      console.log(searchedProduct)
      setFiltered(true)
    }

    const handleKeyDown = (event) =>{ 
        if(event.key === 'Enter')
        searchProduct();
    }
  return (
    <div>
     <div >
      <img src={SearchIcon} alt='search-icon'  height={24} width={24}  />
      <input className='search-products'
      placeholder='Search for products' 
      ref={inputRef}
      onKeyDown={handleKeyDown} 
      type="text" 
      />
      </div>
    </div>
  )
}

export default SearchInput