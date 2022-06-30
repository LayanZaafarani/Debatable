/**
 * endorsementServices.js responsible for managing endorsement business logic.
 * Layan Zaafarani 6/2022
 */

// imports
 const endorsementRepo = require('../repositories/endorsementRepository');

 // add endorsement
 const addEndorsement = async function(req, res){
    // Get the data
    let data = req.body;

    // Get debate ID
    let {debateId} = req.params;

    try{
        // try adding the debate to the database.
        const endorsement = await endorsementRepo.addOrUpdateEndorsement(debateId, req.user.id, data.opinion);
        // send response.
        await res.status(200).send(endorsement);
    }
    catch(err){
        // error occured at database level
        res.status(400).send(err);
    }
 };

 // exports
 module.exports = {
    addEndorsement
}