/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.alterTable("examRequest", table => {
        table.dropForeign("vetId");
        table.integer("vetId").unsigned().nullable().alter();
        table.foreign("vetId").references("user.id").onDelete("SET NULL").onUpdate("CASCADE");
    });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {};
