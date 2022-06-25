/**
 * helper.js contains random functions that are used across the backend.
 * Layan Zaafarani 6/2022
 */

// load lodash 
const lodash = require('lodash');

/**
 * converts input given for ordering fields into array of fields
 *  accepted by knex.
 * ex: -created_at,title ->
 * [
 * {column : 'created_at', order: 'desc'},
 * {column: 'title' }
 * ]
 * 
 * @param {String} orderByString 
 * @returns {Array}
 */
const parseOrderBy = function(orderByString){
    const orderByStringArray = orderByString.split(',');

    return lodash.map(orderByStringArray, function(field){
        if(field.indexOf('-') === 0){
            return {
                column: field.substring(1),
                order: 'desc'
            }
        }
        return{
            column: field
        };
    });
}

module.exports = {
    parseOrderBy
}