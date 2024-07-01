/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.table("appointment", (table) => {
        table.dropForeign("petId");
        table.dropColumn("petId");
        table.setNullable("description");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.table("appointment", (table) => {
        table.integer("petId").unsigned().nullable();
        table.foreign("petId").references("pet.id");
        table.dropNullable("description");
    });
};
