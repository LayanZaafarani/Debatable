/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    // add password attribute
    await knex.schema.alterTable('users', function(table){
        table.string('password')
        .notNullable();

        // alter the users table to make gender nullable
        table.enu('gender', ['male', 'female'], {useNative: true, existingType: true, enumName: 'user_gender'})
        .nullable()
        .alter();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
