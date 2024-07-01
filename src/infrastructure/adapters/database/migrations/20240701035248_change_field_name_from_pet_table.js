/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.table("pet", (table) => {
        table.setNullable("photo");
        table.setNullable("breed");
        table.renameColumn("photo", "photoFileName");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.table("pet", (table) => {
        table.dropNullable("breed");
        table.dropNullable("photoFileName");
        table.renameColumn("photoFileName", "photo");
    });
};
