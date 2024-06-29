/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable("pet", table => {
        table.increments("id").primary();
        table.string("name", 100).notNullable();
        table.date("birthDate").notNullable();
        table.string("species").notNullable();
        table.string("breed", 100);
        table.binary("photo");
        table.integer("ownerId").unsigned();
    }).then(function (){
        return knex("pet").insert([
            {
                name: "Bella",
                birthDate: new Date(),
                species: "dog",
                breed: "maltese",
                photo: 0b0,
                ownerId: 1
            }
        ]);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTable("pet");
};
