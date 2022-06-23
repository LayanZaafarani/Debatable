/**
 * endorsementRoutes.js responsible for defining APIs/routes for endorsement.
 * Layan Zaafarani 6/2022
 */

 const endorsementService = require('../services/endorsementService');
 const Router = require('express').Router();
 
 // add endorsement router
 Router.post('/', endorsementService.addEndorsement);
 
 module.exports = Router;