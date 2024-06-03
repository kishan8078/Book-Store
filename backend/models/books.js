const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
            title : {
                type : String,
                required : true,
            },
            author : {
                type : String,
                required : true,
            },
            publishYear : {
                type : String,
                required : true,
            },
            uploadedDate : {
                type : Date,
                required : true,
                default : Date.now
            }
        })

const Book = mongoose.model('Books' , booksSchema)
module.exports = {Book}

