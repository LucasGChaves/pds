/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.table("examRequest", table => {
        table.integer("appointmentId").notNullable().unsigned();
        table.foreign("appointmentId").references("appointment.id");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.table("examRequest", table => {
        table.dropForeign("appointmentId");
        table.dropColumn("appointmentId");
    });
};
