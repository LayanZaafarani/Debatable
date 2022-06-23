/**
 * debateServices.js responsible for managing debates business logic.
 * Layan Zaafarani 6/2022
 */

const debateRepo = require('../repositories/debateRepository');

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

module.exports = {
    addDebate
}