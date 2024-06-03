const express = require('express')
const router = express.Router();
const {validateToken} = require('../JWT/jwt')
const {Book} = require('../models/books')
const {User} = require('../models/user')

//Add to cart
router.post('/:id' , validateToken , async (req , res) => {
    const userId = req.userId ;
    // const id = req.params.id;
    console.log("inside add to cart")
    try{
        const book = await Book.findOne({_id : req.params.id});
        if(!book){
            res.json({message : "something went wrong"});
        }

        // const userId = req.userId;
        // userId = '660829bb0820ab490fa4bc59';
        const  user = await User.findOne({_id : userId});
        user.cart.push(book._id);
        const result = await user.save();
        if(result){
            res.json({message : "Added to cart" , bookId : book._id })
        }
        else{
            res.json({message : "Couldn't add to cart"})
        }
    }
    catch(err){
        res.json({errorMessage : err.message})
    }
})


//Get all cart Items
router.get('/', validateToken , async (req ,res) => {
    const userId = req.userId ;
    //const userId = '660829bb0820ab490fa4bc59';
    try{
        const user = await User.findOne({_id : userId}).populate('cart');
        console.log(user);
        res.json({CartItems : user.cart})
    }
    catch(err){
        res.json({errorMessagee : err.message});
    }
})

//Delete from cart
router.delete('/:id' , validateToken , async (req , res) => {
    const userId = req.userId ;
    //const userId = '660829bb0820ab490fa4bc59';
    try{
        const user = await User.findOne({_id : userId});
        // console.log(user.username);
        await user.cart.remove(req.params.id);
        const result = user.save();
        if(result){
            res.json({message : "Deleted From Cart"});
        }
        else{
            res.json({message : "Couldn't Delete From Cart"});
        }
    }
    catch(err){
        res.json({errorMessagee : err.message});
    }
})

module.exports = router;
