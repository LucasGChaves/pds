/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable("vaccine", table => {
        table.increments("id").primary();
        table.string("vaccineName", 100).notNullable();
        table.string("manufacturer", 100).notNullable();
        table.date("batch", 100).notNullable();
        table.integer("petId").notNullable().unsigned();
        table.integer("vetId").notNullable().unsigned();
    }).then(function (){
        return knex("vaccine").insert([
            {
                vaccineName: "vaccine",
                manufacturer: "manufacturer",
                batch: new Date(),
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
    return knex.schema.dropTable("vaccine");
};
