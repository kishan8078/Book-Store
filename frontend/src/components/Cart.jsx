import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardItem from './CardItem'
import '../css/AllBookCSS.css'

const Cart = () => {
    const [books , setBooks] = useState([])
    const [del, setDel]  = useState(true)
    const [refreshCart , setRefreshCart] = useState(false);

    const refreshCartHandler = () => {
        setRefreshCart(!refreshCart);
    }

    const img = "https://shopnesthome.com/cdn/shop/files/bf1ed694669898a649b8324ccc576c037b07a533dafac81d8249f5456f6b034d.webp?v=1701478104&width=1500"
    useEffect(() => {
        axios.get('http://localhost:3000/cart'  , { withCredentials: true })
        .then(res => {
            console.log("res is : " , res);
            if ((res.data.CartItems)) {
                setBooks(res.data.CartItems);
            } else {
                console.error("Invalid response structure:", res.data);
                setBooks([]);
            }
        })
        .catch((err) => {
            console.log({erR : "error is " + err})
        })
    } , [refreshCart])
  return (
    <div className='card-container'>
            {books.length > 0 ? (
                books.map((book, index) => {
                    console.log({ "book id:": book._id });
                    console.log({ "author:": book.author });
                    return (
                        <CardItem
                            key={index}
                            bookId={book._id}
                            image={img}
                            bookName={book.title}
                            author={book.author}
                            del={del}
                            refreshCartHandler={refreshCartHandler}
                        />
                    );
                })
            ) : (
                <p>No data</p>
            )}
        </div>
  )
}

export default Cart
