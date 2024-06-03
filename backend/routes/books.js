const express = require('express');
const router = express.Router()
const {Book} = require('../models/books')

//Getting all
router.get('/' , async (req , res) => {
    try{
        const allBooks = await Book.find();
        res.json(allBooks);
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
})

// Getting One
router.get('/:id' , async (req , res) => {
    const id = req.params.id
    try{
        const book = await Book.findById(id);
        if(book){
            res.status(200).json({book : book})
        }
        else{
            res.json({message : "Book not found"});
        }
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
})

//Creating one
router.post('/' , async (req , res) => {
    const book = new Book({
        title : req.body.title,
        author : req.body.author,
        publishYear : req.body.publishYear,
    })

    try{
        const newBook = await book.save()
        res.status(201).json(newBook);
    }
    catch(error){
        res.status(400).json({message : error.message});
    }
})

//Updating One
router.patch('/:id' , async (req , res) => {
    if(req.body.title==null)
        res.status(400).json({message : "titlee"});
    if(req.body.author==null)
        res.status(400).json({message : "authorr"});
    if(req.body.publishYear==null)
        res.status(400).json({message : "publishYearr"});

    const id = req.params.id;
    try{
        const updatedBook = await Book.findByIdAndUpdate(id , req.body)
        if(updatedBook){
            res.status(200).json({message : "Book got Updated"});
        }
        res.status(400).json({message : "Book not found"});
    }
    catch(err){
        res.status(400).json({message : err.messaage + " Update was not successfull!"});
    }
})

//Deleting One
router.delete('/:id' , async (req , res) => {
    const id = req.params.id;
    try{
        const book = await Book.findById(id);
        if(book!==null){
            try{
                const deletedBook = await Book.findByIdAndDelete(id);
                res.json({deletedBook : "Book is deleted"})
            }
            catch(err){
                res.json({message : message});
            }
        }
        res.json({messaage : "Book not found"});
    }
    catch(error){
        res.json({messaage : error.messaage});
    }
})

//Get By Name
router.get('/byName/:name' , async (req , res) => {
    const name = req.params.name.toLowerCase();
    console.log(name);
    const book = await Book.find({title : name})
    console.log(book);

    try{
        if(book){
            res.json(book);
        }else{  
            res.json({message : "Book Not Found!"});
        }
    }
    catch(err){
        res.json({message : "Error msg is " + err.messaage})
    }
})

module.exports = router