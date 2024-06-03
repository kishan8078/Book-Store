import React, { useState } from 'react';
import '../css/CardItemCSS.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const CardItem = ({ image, author, bookName, bookId , del , refreshCartHandler}) => {
  
  console.log("del is " , del);
  const addTOCart = (id) => {
    // console.log({"book id in cartItem : " : id});
    // console.log({"author in cartItem: " : author})
    axios.post(`http://localhost:3000/cart/${id}` , {} , { withCredentials: true })
    .then((res) => {
      console.log({"response" : res})
      toast.success("Added to cart")
    })
    .catch((err) => {
      console.log({"errMSG" : err.message})
    })
  }

  const deleteFromCart = (id) => {
    // console.log({"book id in cartItem : " : id});
    // console.log({"author in cartItem: " : author})
    axios.delete(`http://localhost:3000/cart/${id}` , { withCredentials: true })
    .then((res) => {
      toast.error("Deleted from cart")
      refreshCartHandler();
      console.log({"response" : res})
    })
    .catch((err) => {
      console.log({"errMSG" : err.message})
    })
  }

  const buy = () => {
    toast("Since payment integrations are not done , we have not implemented that !!" , {duration : 3000})
  }

  return (
    <div className="card">
      <img src={image} alt="Book Cover" className="card-image" />
      <div className="card-content">
        <h2 className="book-name">{bookName}</h2>
        <p className="author">Author: {author}</p>
        <button className='button' onClick={() => addTOCart(bookId)} >Add to cart</button>
        {del ? <button className='button' onClick={() => deleteFromCart(bookId)} >Delete</button> : ""}
        <button className='button' onClick={buy}>Buy</button>
      </div>
    </div>
  );
};

export default CardItem;
