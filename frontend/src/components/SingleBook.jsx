import React,{useEffect, useState} from 'react'
import axios from "axios";
import toast from 'react-hot-toast';

const SingleBook = (props) => {

    const img = "https://shopnesthome.com/cdn/shop/files/bf1ed694669898a649b8324ccc576c037b07a533dafac81d8249f5456f6b034d.webp?v=1701478104&width=1500"

    const bookName = props.bookName;
    const [Id , setId] = useState()
    const [title , setTitle] = useState("")
    const [author , setAuthor] = useState("")
    const [publishYear , setPublishYear] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:3000/books/byName/${bookName}`)
        .then((res) => {
            console.log(res);
            setTitle(res.data[0].title);
            setAuthor(res.data[0].author)
            setId(res.data[0]._id)
            setPublishYear(res.data[0].publishYear)
        })
        .catch((err) => {
            console.log({message : err});
        })
    } , [])


        
    const addTOCart = (id) => {
        console.log({"book id in cartItem : " : id});
        console.log({"author in cartItem: " : author})
        axios.post(`http://localhost:3000/cart/${id}` , {} , { withCredentials: true })
        .then((res) => {
            toast.success("Added to cart")
            console.log({"ress" : res})
        })
        .catch((err) => {
            console.log({"errMSG" : err.message})
        })
    }

    const buy = () => {
        toast("Since payment integrations are not done , we have not implemented that !!" , {duration : 3000})
      }

    return (
        <div className="card-container">
            <div className="card">
                <img src={img} alt="Book Cover" className="card-image" />
                <div className="card-content">
                    <h2 className="book-name">{title}</h2>
                    <p className="author">Author: {author}</p>
                    <button className='button' onClick={() => addTOCart(Id)} >Add to cart</button>
                    <button className='button' onClick={buy}>Buy</button>
                </div>
            </div>
        </div>
    )
}

export default SingleBook


{/* <div>
    <h2>Book details</h2>
    <p>book name : {title} </p>
    <p>book author : {author} </p>
    <p>book publishYear : {publishYear} </p>
    <p>Add to cart : {Id} </p>
    <p>Buy : {publishYear} </p>
</div> */}