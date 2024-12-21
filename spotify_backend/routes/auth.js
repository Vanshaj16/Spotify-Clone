const express = require("express");
const router = express.Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");
const {getToken} = require("../utils/helpers");

// This POST route will help to register a new user
router.post("/register", async (req,res) => {
    // This code is run when the /register api is called as a POST request  
    // My req.body will be of the format (email, password, firstName, lastName, username)
    const {email, password, firstName, lastName, username} = req.body;

    // Step 2 : Does a user with this email already exist if yes, we throw an error
    const user = await User.findOne({email: email});
    if(user) {
        return res.status(403).json({error: "A user with this email already exists"})
    }
    // This is a valid request

    // Step 3 : Create a new user in the db
    // Step 3.1 : We do not store passwords in plain text.
    // xyz: we convert the plain text password to a hash using bcrypt.
    // My hash of xyz depends on 2 parameters. 
    // If I keep those 2 parameters same, then xyz always give the same hash.
    const hashedPassword = bcrypt.hash(password, 10);
    const newUserData = {
        email, 
        password: hashedPassword, 
        firstName, 
        lastName, 
        username,
    };
    const newUser = await User.create(newUserData);

    // Step 4 : We want to create the token to return to the user
    const token = await getToken(email, newUser);

    // Step 5 : We return the token to the user
    const userToReturn = {...newUser.toJSON(), token};
    delete userToReturn.password;    
    return res.status(200).json(userToReturn);
});

router.post("/login", async (req,res) =>{
    // Step 1 : Get email and password sent by user from req.body
    const {email, password} = req.body;

    // Step 2 : Check if a user with the given email exists. If not, the credentials is invalid.
    const user = await User.findOne({email: email});
    if(!user){
        return res.status(403).json({err: "Invalid credentials"});
    }

    // Step 3 : If the user exists, check is the password is correct. If not, the credentials are invalid.
    // This is a tricky step. Why? Because we have stored the original password in a hashed form, which we cannot use to get back the password.
    // I cannot do if(password === user.password) because user.password is a hash.
    // I have to use bcrypt.compare to compare the password with the hash.

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(403).json({err: "Invalid credentials"});
    }

    // Step 4 : If the credentials are correct, return a token to the user.
    const token = await getToken(user.email, user);
    const userToReturn = {...newUser.toJSON(), token};
    delete userToReturn.password;    
    return res.status(200).json(userToReturn);
})
module.exports = router;