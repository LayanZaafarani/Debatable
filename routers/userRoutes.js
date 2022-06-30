/**
 * userRoutes.js responsible for defining APIs/routes for user.
 * Layan Zaafarani 6/2022
 */

// imports
const userServices = require('../services/userServices');
const Router = require('express').Router();

// register user API
Router.post('/register', userServices.hashPasswordMW, userServices.registerUser);

// login user API
Router.post('/login', userServices.login);

// exports
module.exports = Router;