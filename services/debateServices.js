/**
 * debateServices.js responsible for managing debates business logic.
 * Layan Zaafarani 6/2022
 */

const debateRepo = require('../repositories/debateRepository');

// add debate
const addDebate = async function(req, res){
    // get data from body
    let data = req.body;

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

// exports
module.exports = {
    addDebate,
    updateDebate,
    deleteDebate
}