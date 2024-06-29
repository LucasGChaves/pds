/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable("address", table => {
        table.increments("id").primary();
        table.string("city", 100).notNullable();
        table.string("district", 100).notNullable();
        table.string("street", 100).notNullable();
        table.integer("number").notNullable();
        table.string("complement", 100).nullable();
        table.integer("userId").unsigned();
        table.foreign("userId").references("user.id");
    }).then(function (){
        return knex("address").insert([
            {
                "city": "Belo-Horizonte",
                "district": "Liberdade",
                "street": "Rua X",
                "number": 123,
                "complement": "casa",
                "userId": 1
            },
            {
                "city": "Belo-Horizonte",
                "district": "Indaiá",
                "street": "Rua Y",
                "number": 1234,
                "userId": 2
            }
        ]);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTable("address");
};
