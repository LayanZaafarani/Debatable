/**
 * userRepository.js responsible for managing user in the database.
 * Layan Zaafarani 6/2022
 */

// imports
const knex = require('../knexHelper');

// adding users into the database
const addUser = async function(userData){
    return knex
    .insert(userData)
    .into('users')
    .returning(['name', 'email', 'role', 'id', 'gender']);
}

// find the user using his email
const findUserByEmail = async function(email){
    return knex
    .select('password', 'name', 'email', 'id', 'role')
    .from('users')
    .where({email})
    .first();
}

// exports
module.exports = {
    addUser,
    findUserByEmail
}