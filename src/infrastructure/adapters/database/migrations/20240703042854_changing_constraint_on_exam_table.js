/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
    await knex.schema.alterTable("examrequest", (table) => {
        table.setNullable("appointmentId");
        table.integer("appointmentId").unsigned().alter();
        table.foreign("appointmentId").references("appointment.id").onDelete("SET NULL").onUpdate("CASCADE");
        table.dropForeign("petId");
        table.foreign("petId").references("pet.id").onDelete("CASCADE").onUpdate("CASCADE");
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {};
