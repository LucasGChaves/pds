/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
    await knex.schema.alterTable("appointment", (table) => {
        table.dropForeign("vetId");
        table.foreign("vetId").references("user.id").onDelete("CASCADE").onUpdate("CASCADE");
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {};
