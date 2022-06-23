/**
 * endorsementServices.js responsible for managing endorsement business logic.
 * Layan Zaafarani 6/2022
 */

 const endorsementRepo = require('../repositories/endorsementRepository');

 const addEndorsement = async function(req, res){
    // Get the data
    let data = req.body;

    try{
        // try adding the debate to the database.
        const endorsement = await endorsementRepo.addOrUpdateEndorsement(data.debate_id, data.user_id, data.opinion);
        // send response.
        await res.status(200).send(endorsement);
    }
    catch(err){
        // error occured at database level
        res.status(400).send(err);
    }
 };

 module.exports = {
    addEndorsement
}