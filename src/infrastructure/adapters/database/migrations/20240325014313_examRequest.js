/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable("examRequest", table => {
        table.increments("id").primary();
        table.binary("vetSignature").notNullable();
        table.string("result").notNullable();
        table.binary("resultFile").notNullable();
        table.integer("petId").notNullable().unsigned();
        table.integer("vetId").notNullable().unsigned();
    }).then(function (){
        return knex("examRequest").insert([
            {
                vetSignature: 0b0,
                result: "ok",
                resultFile: 0b0,
                petId:1,
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
    return knex.schema.dropTable("examRequest");
};
