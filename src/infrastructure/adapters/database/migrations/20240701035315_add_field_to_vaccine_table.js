/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.table("vaccine", (table) => {
        table.date("applicationDate").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.table("vaccine", (table) => {
        table.dropNullable("applicationDate");
        table.dropColumn("applicationDate");
    });
};
