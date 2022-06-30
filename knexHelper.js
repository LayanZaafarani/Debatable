/**
 * knexHelper.js allowing us to use knex all over the backened.
 * Layan Zaafarani 6/2022
 */

const enviroment = 'development';
const config = require('./knexfile')[enviroment];

module.exports = require('knex')(config);