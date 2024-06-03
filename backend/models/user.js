const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type:String,
        unique:true,
    },
    password : {
        type:String,
        unique:true
    },
    cart : [
        {
            type : mongoose.Schema.Types.ObjectId ,
            ref : 'Books',
        }
    ]
})

const User = mongoose.model('Users' , userSchema)
module.exports = {User};