/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable("examRequest", table => {
        table.increments("id").primary();
        table.binary("vetSignature").notNullable();
        table.string("result").notNullable();
        table.binary("resultFile").notNullable();
        table.integer("petId").notNullable().unsigned();
        table.integer("vetId").notNullable().unsigned();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTable("examRequest");
};
