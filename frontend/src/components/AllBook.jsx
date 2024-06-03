import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardItem from './CardItem'
import '../css/AllBookCSS.css'


const AllBook = () => {
    // const [name , setName] = useState("")
    // const [author , setAuthor] = useState("")
    // const [publishYear , setPublishYear] = useState("")
    const [books , setBooks] = useState([])
    const img = "https://shopnesthome.com/cdn/shop/files/bf1ed694669898a649b8324ccc576c037b07a533dafac81d8249f5456f6b034d.webp?v=1701478104&width=1500"
    useEffect(() => {
        axios.get('http://localhost:3000/books')
        .then(res => {
            console.log(res.data);
            console.log(res.data);
            setBooks(res.data)
        })
        .catch((err) => {
            console.log({erR : "error is " + err})
        })
    } , [])


    return (
        <div className='card-container'>
            {books.map((book , index) => {
                console.log({"book id : " : book._id})
                console.log({"author: " : book.author})
                return(
                    <CardItem 
                    
                    bookId = {book._id}
                    image = {img}
                    bookName = {book.title}
                    author = {book.author}
                />
                )
            })}
        </div>
    )
}

export default AllBook



{/* <div>
        <table>
            
                <thead>
                    <tr  className='text-green-400'>
                    <th className='text-green-400'>SL. No</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>PublishYear</th>
                    </tr>
                </thead>
            <tbody>
                {books.map((book , index) => (
                    
                        
                            <tr key={index}>
                                <td>{index+1}</td>{console.log(book.title)}
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.publishYear}</td>
                            </tr>
                        
                    
                ))}
            </tbody>

            
        </table>
</div> */}