/**
 * endorsementRoutes.js responsible for defining APIs/routes for endorsement.
 * Layan Zaafarani 6/2022
 */

// imports
 const endorsementService = require('../services/endorsementService');
 const {isAuthenticated} = require('../services/userServices');
 const Router = require('express').Router();
 
 // add endorsement router
 Router.post('/:debateId/endorsements', isAuthenticated, endorsementService.addEndorsement);
 
 // exports
 module.exports = Router;