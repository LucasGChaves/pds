/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable("appointment", table => {
        table.increments("id").primary();
        table.date("appointmentDate").notNullable();
        table.string("description", 100).notNullable();
        table.integer("petId").notNullable().unsigned();
        table.integer("vetId").notNullable().unsigned();
    }).then(function (){
        return knex("appointment").insert([
            {
                appointmentDate: new Date(),
                description: "description",
                petId: 1,
                vetId: 2
            }
        ]);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTable("appointment");
};
