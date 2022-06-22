/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    return knex.schema
    .createTable('debates', function(table){
        // ID
        table.uuid('id')
        .primary
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v1()'));

        // Title 
        table.string('title')
        .notNullable()
        .unique();

        //Description
        table.string('description');

        //Created at
        table.timestamp('created_at').defaultTo(knex.fn.now);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
