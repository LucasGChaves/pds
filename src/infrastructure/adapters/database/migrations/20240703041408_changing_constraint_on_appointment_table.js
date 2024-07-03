/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {

    await knex.schema.alterTable("appointment", (table) => {
        table.dropForeign("petId");
        table.foreign("petId").references("pet.id").onDelete("SET NULL").onUpdate("CASCADE");
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {};
