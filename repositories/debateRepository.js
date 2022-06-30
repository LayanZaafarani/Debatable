/**
 * debateRepository.js responsible for managing debates in the database.
 * Layan Zaafarani 6/2022
 */

// imports
const {orderBy} = require('lodash');
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

// get debates
const getDebates = async function(offset, limit, searchTerm, orderBy){
    return knex
    .select('id', 'title', 'description', 'created_at')
    .from('debates')
    .where({isDeleted: false})
    // if there is a sreach term modify the query into searching for the term
    .modify(function(query){
        if(searchTerm){
            query.whereILike('title', '%' + searchTerm + '%')
            .orWhereILike('description', '%' + searchTerm + '%')
        }
    })
    // index 
    .offset(offset)
    // limit of debates sent back
    .limit(limit)
    // order debates by
    .orderBy(orderBy);
}

// exports
module.exports = {
    addDebate,
    updateDebate,
    markDebateAsDeleted,
    getDebates
}