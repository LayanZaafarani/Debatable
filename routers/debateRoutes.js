/**
 * debateRoutes.js responsible for defining APIs/routes for debates.
 * Layan Zaafarani 6/2022
 */

const debateServices = require('../services/debateServices');
const Router = require('express').Router();

// add debate router
Router.post('/', debateServices.addDebate);

module.exports = Router;