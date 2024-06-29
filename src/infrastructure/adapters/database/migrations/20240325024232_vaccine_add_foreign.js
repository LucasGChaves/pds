/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.table("vaccine", table => {
        table.foreign("petId").references("pet.id");
        table.foreign("vetId").references("user.id");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.table("vaccine", table => {
        table.dropForeign("petId");
        table.dropForeign("vetId");
    });
};
