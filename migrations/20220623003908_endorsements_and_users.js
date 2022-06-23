/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function(knex) {

  // uuid 
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  // Table users 
  return knex.schema
  .createTable('users', function(table){
    //Attributes
    //ID
    table.uuid('id')
    .primary()
    .notNullable()
    .defaultTo(knex.raw('uuid_generate_v1()'));

    //Name
    table.string('name')
    .notNullable();

    //email
    table.string('email')
    .notNullable()
    .unique();

    //Roles
    table.enu('role', ['admin', 'user'], {useNative: true, enumName: 'user_role'})
    .notNullable()
    .defaultTo('user');

    //Genders
    table.enu('gender', ['male', 'female'], {useNative: true, enumName: 'user_gender'})
    .notNullable();

    //Created at
    table.timestamp('created_at')
    .defaultTo(knex.fn.now());
  })

  // Table endorsement
  .createTable('endorsements', function(table){
    //Attributes
    //ID
    table.uuid('id')
    .primary()
    .notNullable()
    .defaultTo(knex.raw('uuid_generate_v1()'));

    // User ID
    table.uuid('user_id')
    .notNullable();
    
    // Referencing the user ID to the users table
    table.foreign('user_id').references('id').inTable('users');

    // Debate ID
    table.uuid('debate_id')
    .notNullable();
    
    // Referencing the debate ID to the debates table
    table.foreign('debate_id').references('id').inTable('debates');

    // Opinion
    table.enu('opinion', ['for', 'against', 'neutral'], {useNative: true, enumName: 'endorsement_opinion'})
    .notNullable()

    // Created at
    table.timestamp('created_at')
    .defaultTo(knex.fn.now());

    // Unique constraint
    table.unique(['user_id', 'debate_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
