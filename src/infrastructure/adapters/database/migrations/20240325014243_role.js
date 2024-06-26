/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable("role", table => {
        table.increments("id").primary();
        table.string("roleName", 100).notNullable();
    }).then(function (){
        return knex("role").insert([
            {roleName: "Tutor de Pet"},
            {roleName: "Veterinário"}
        ]);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTable("role");
};
