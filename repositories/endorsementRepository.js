/**
 * enorsementRepository.js responsible for managing endorsement in the database.
 * Layan Zaafarani 6/2022
 */

// imports
const knex = require('../knexHelper');

// inserting debates into debates table
const addOrUpdateEndorsement = async function(debateId, userId, opinion){
    return knex
        .insert({
            debate_id: debateId,
            user_id: userId,
            opinion
        })
        .into('endorsements')
        .onConflict(['debate_id', 'user_id'])
        .merge()
        .returning('*');
};

// exports
module.exports = {
    addOrUpdateEndorsement
}