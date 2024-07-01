/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.table("examRequest", (table) => {
        table.setNullable("result");
        table.setNullable("resultFile");
        table.renameColumn("resultFile", "resultFileName");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.table("examRequest", (table) => {
        table.dropNullable("resultFileName");
        table.renameColumn("resultFileName", "resultFile");
        table.dropNullable("result");
    });
};
