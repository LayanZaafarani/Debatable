/**
 * debateServices.js responsible for managing debates business logic.
 * Layan Zaafarani 6/2022
 */

// imports
const debateRepo = require('../repositories/debateRepository');
const helpers = require('../helpers/helper');

// add debate
const addDebate = async function(req, res){
    // get data from body
    let data = req.body;
    data.user_id = req.user.id;

    try{
        // try adding the debate to the database.
        const insertedDebate = await debateRepo.addDebate(data);
        // send response.
        await res.status(200).send(insertedDebate);
    }
    catch(err){
        // error occured at database level
        await res.status(400).send(err);
    }
};

// update debate
const updateDebate = async function(req, res){
    // debate id from request parameters
    const {debateId} = req.params;

    // get data
    const data = req.body;

    try{
        // try updating the debate
        const debate = await debateRepo.updateDebate(debateId, data);
        // send response.
        await res.status(200).send(debate);
    }
    catch(err){
        // error occured at database level
        await res.status(400).send(err);
    }
};

// soft delete debate
const deleteDebate = async function(req, res){
    // debate id from request parameters
    const {debateId} = req.params;

    try{
        // try deleting the debate
        await debateRepo.markDebateAsDeleted(debateId);
        // send response.
        await res.status(204).end();
    }
    catch(err){
        // error occured at database level
        await res.status(400).send(err);
    }
}

// get debates
const getDebates = async function(req, res){
    // get offset and limit from query parameters
    let {offset, limit, searchTerm, orderBy} = req.query;

    // if offset is not provided deafult value is 0
    offset = offset?? 0;

    // if limit is not provided defaul value is 100
    limit = limit?? 10;

    // limit the limit to 100
    if(limit > 100){
        limit = 100;
    }

    try{
        // try getting the debates
        const debates = await debateRepo.getDebates(offset, limit, searchTerm, orderBy);
        // send response.
        await res.status(200).send(debates);
    }
    catch(err){
        // error occured at database level
        await res.status(400).send(err);
    }
}

// ordering of debates 
const parseOrderByForDebates = async function(req, res, next){
    // get order if sent by user
    const {orderBy} = req.query;

    // default order by newest debates
    if(!orderBy){
        req.query.orderBy = [{
            column: 'created_at', order: 'desc'
        }];
    }
    // if order is sent by user, ready it for knex 
    else{
        req.query.orderBy = helpers.parseOrderBy(req.query.orderBy);
    }
    // go to next function
    return next();
}

// exports
module.exports = {
    addDebate,
    updateDebate,
    deleteDebate,
    getDebates,
    parseOrderByForDebates
}