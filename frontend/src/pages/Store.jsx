import React, { useState } from 'react';
import '../css/StoreCSS.css'
import SingleBook from '../components/SingleBook';
import AllBook from '../components/AllBook';


const Store = () => {
  const [bookName , setBookName] = useState("")
  const [viewSBook , setViewSBook] = useState(false)
  const [viewABook , setViewABook] = useState(true)

  function handleSearchName(event){
    setBookName(event.target.value);
  }
  
  function searchBook(){
    setViewSBook(true);
    setViewABook(false);
  }
  
  function viewAll(){
    setViewABook(true);
    setViewSBook(false);
  }

  return (
    <div className='all-container'>
      
      <div >
        <div className='search-container'>
          <input type="text" className='search-input' placeholder='search for a book' onChange={(event) = handleSearchName} value={bookName}/>
          <button onClick={searchBook} className='search-button' >Search</button>
          <button onClick={viewAll}  className='view-all-button'>View all Books</button>
        </div>
      </div>
      {viewSBook && <SingleBook bookName = {bookName}/>}

      {viewABook && <AllBook />}
    </div>
  )
}

export default Store
