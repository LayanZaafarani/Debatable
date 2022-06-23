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

// update a debate
const updateDebate = async function(debateId, updateData){
    return knex('debates')
        .where({
            id: debateId,
            isDeleted: false
        })
        .update(updateData)
        .returning('*');
};

// delete a debate
const markDebateAsDeleted = async function(debateId){
    return knex('debates')
        .where({id: debateId})
        .update({isDeleted: true});
}

// exports
module.exports = {
    addDebate,
    updateDebate,
    markDebateAsDeleted
}