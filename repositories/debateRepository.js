/**
 * debateRepository.js responsible for managing debates in the database.
 * Layan Zaafarani 6/2022
 */

// for using knex
const knex = require('../knexHelper');

// inserting debates into debates table
const addDebate = async function(debateData){
    return knex
        .insert(debateData)
        .into('debates')
        .returning('*');
};

module.exports = {
    addDebate
}