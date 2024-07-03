/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.table("pet", (table)=> {
        table.dropForeign("ownerId");
        table.foreign("ownerId").references("user.id").onDelete("CASCADE").onUpdate("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.table("pet", (table)=> {
        table.dropForeign("userId");
        table.foreign("ownerId").references("user.id");
    });
};
