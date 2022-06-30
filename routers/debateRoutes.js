/**
 * debateRoutes.js responsible for defining APIs/routes for debates.
 * Layan Zaafarani 6/2022
 */

// imports
const debateServices = require('../services/debateServices');
const {isAuthenticated, isInRole} = require('../services/userServices');
const Router = require('express').Router();

// add debate route
Router.post('/', isAuthenticated, isInRole(['user']), debateServices.addDebate);

// update debate route
Router.put('/debate/:debateId', isAuthenticated, debateServices.updateDebate);

// delete debate route
Router.delete('/debate/:debateId', isAuthenticated, debateServices.deleteDebate);

// get debate, but first ready the order by
Router.get('/',debateServices.parseOrderByForDebates, debateServices.getDebates);

// exports
module.exports = Router;