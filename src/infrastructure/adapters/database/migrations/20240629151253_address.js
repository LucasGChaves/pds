/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable("address", table => {
        table.increments("id").primary();
        table.string("city", 100).notNullable();
        table.string("district", 100).notNullable();
        table.string("street", 100).notNullable();
        table.integer("number").notNullable();
        table.string("complement", 100).nullable();
        table.integer("userId").unsigned();
        table.foreign("userId").references("user.id");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTable("address");
};
