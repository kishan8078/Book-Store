require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors')

mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            console.log("connected to database");
        })
        .catch((error) => console.error("errow mess is : " , error))


app.use(express.json());
app.use(cors({origin:"http://localhost:5173" , credentials:true}))
app.use(cookieParser());

const BookRouter = require('./routes/books.js');
app.use('/books' , BookRouter);

const UserRouter = require('./routes/user.js')
app.use('/user' , UserRouter);

const CartRouter = require('./routes/cart.js')
app.use('/cart' , CartRouter);

app.listen(3000 , () => console.log("Server is runnig"));