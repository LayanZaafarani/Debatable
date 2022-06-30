/**
 * testHelper.js contains functions that are used for testing.
 * Layan Zaafarani 6/2022
 */

// imports
const knex = require('../knexHelper');
const {faker} = require('@faker-js/faker');
const bycrypt = require('bcryptjs');

// delete all records in the database
const clearDatabase = async function(){
    return await knex.raw('TRUNCATE debates, endorsements, users');
}

// close connection with the database
const closeConnection = async function(){
    return knex.destroy();
}

// add fake users 
const addUsers = async function(){
    const hashedPassword = await bycrypt.hash('123456', 12);

    await knex('users').insert([{
        name: "Layan Zaafarani",
        email: "loyeen@hotmail.com",
        gender: "female",
        role: "admin",
        password: hashedPassword
    },
    {
        name: "Orjwan Zaafarani",
        email: "Orjwan@hotmail.com",
        gender: "male",
        role: "user",
        password: hashedPassword
    }
    ])
}

// prepare the database
const prepareDatabase = async function(){
    await addUsers();

    // get the user
    const user = await knex
    .select('id')
    .from('users')
    .where({role: 'user'})
    .first();

    // add fake debate
    const debate = await knex('debates')
    .insert({
        title: faker.lorem.sentence(3),
        description: faker.lorem.sentence(8),
        user_id: user.id
    })
    .returning('*');
    
    // return user and debate 
    return {user, debate:debate[0]};
}

// exports
module.exports = {
    closeConnection,
    clearDatabase,
    prepareDatabase
}