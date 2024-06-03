const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const bcrypt = require('bcrypt')
const {createTokens} = require('../JWT/jwt')

// Register user
router.post('/register' , async (req , res) => {
    const username = req.body.username;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password , 10);
    const Euser = new User({
        username : username,
        password : hashedPassword
    })
    try{
        const newUser = await Euser.save();
        if(newUser){
            const newUserToken = createTokens(newUser);
            res.cookie("access-token" ,  newUserToken, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true });
            res.json({message : "User created"  , username : newUser.username , password : newUser.password});
        }
        else{
            res.json({message : "User not created"});
        }
    }
    catch(err) {
        res.status(400).json({message : err.message  + "Error creating account"});
    }
    
})


//Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ errorMessage: "Fields must be filled" });
    }

    const user = await User.findOne({ username: username });
    if (!user) {
        return res.status(404).json({ message: "User Not Found" });
    }

    try {
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: "Password doesn't match" });
        }

        const accessToken = createTokens(user);

        res.cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            domain: 'localhost', // Ensure this is correctly set
            path: '/'
        })
        .status(200).json({ message: "User logged in", accessToken: accessToken });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;

