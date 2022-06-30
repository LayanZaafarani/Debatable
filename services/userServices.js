/**
 * userServices.js responsible for managing user business logic.
 * Layan Zaafarani 6/2022
 */

// imports
const bcrypt = require('bcryptjs');
const userRepo = require('../repositories/userRepository');
const jwt = require('jsonwebtoken');
const lodash = require('lodash');

// register the new user
const registerUser = async function(req, res, next){
    // get data from body
    const{email, name, password, role, gender} = req.body;

    // create the user information
    const userInfo = {
        email, name, password, role, gender
    }

    try{
        // try inserting the data in the database
        const user = await userRepo.addUser(userInfo);
        // send response.
        await res.status(200).send(user);
    }
    catch(err){
        // error occured at database level
        res.status(400).send(err);
    }
}

// hash the password for privacy
const hashPasswordMW = async function(req, res, next){
    // get the password from the user
    const {password} = req.body;

    // if there is no password send an error
    if(!password){
        return res.status(400).send({'error':'missing password'});
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // modify the body
    req.body.password = hashedPassword;

    return next();
}

// login existing users
const login = async function(req, res, next){
    // get email and password from body
    const {email,password} = req.body;

    // error if email or password not given
    if(!email || !password){
        return res.status(400).send({"error": "Email/password is not given."})
    }

    // find the user using email
    const user = await userRepo.findUserByEmail(email);

    // user not found return an error
    if(!user){
        return res.status(404).send({"error": "user not found"})
    }

    // compare
    try{
        const isMatch = await bcrypt.compare(password, user.password);
        // if no match
        if(!isMatch){
            return res.status(400).send({"error": "invalid password"})
        }
        // password match = sign in
        const response = signInUser(user);

        // send response.
        return res.status(200).send(response);
    }
    catch(err){
        // error occured
        res.status(400).send(err);
    }
}

// sign in
function signInUser(user){
    const {id, email, role, name} = user;

    // make the token using jwt
    const token = jwt.sign({id, email, role, name}, process.env.SECRET, {expiresIn: "7 days"});
    
    // return token and user information
    return {token, user: {id, email, role, name}};
}

// check if the user is authenticated
const isAuthenticated = async function(req, res, next){
    // get the token
    const token = req.headers.token;
    // if token does not exist return an error
    if(!token){
        return res.status(403).send({"error": "Token is missing."});
    }
    // if token is found, verify it
    try{
        const decodedUser = await jwt.verify(token, process.env.SECRET);
        // add the decoded user to the request object
        req.user = decodedUser;
        // go next if verified 
        return next();
    }
    catch (err){
        // if token is not verified return not authenticated 
        return res.status(403).send({"error": "Inavild Token"})
    }
}

// check if the user's role is in one of the allowed roles
const isInRole = function(roles){
    return function(req, res, next){
        const {role} = req.user;

        // if the user role is one of the allowed roles continue
        if (lodash.indexOf(roles, role) >= 0){
            return next();
        }
        // otherwise return an authorization error
        return res.status(401).send({"error": "user's role should be one of: "+roles.join(',')});
    }
}

// exports
module.exports = {
    hashPasswordMW,
    registerUser,
    login,
    isAuthenticated,
    isInRole
}