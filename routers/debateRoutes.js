/**
 * debateRoutes.js responsible for defining APIs/routes for debates.
 * Layan Zaafarani 6/2022
 */

const debateServices = require('../services/debateServices');
const Router = require('express').Router();

// add debate route
Router.post('/', debateServices.addDebate);

// update debate route
Router.put('/debate/:debateId', debateServices.updateDebate);

// delete debate route
Router.delete('/debate/:debateId', debateServices.deleteDebate);

// exports
module.exports = Router;