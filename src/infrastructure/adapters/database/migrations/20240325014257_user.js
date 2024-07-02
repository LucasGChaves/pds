/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.createTable("user", table => {
        table.increments("id").primary();
        table.string("username", 100).notNullable();
        table.string("firstName", 100).notNullable();
        table.string("lastName", 100).notNullable();
        table.string("password", 100).notNullable();
        table.string("cpf", 100).notNullable().unique();
        table.string("crmv", 100).unique().nullable();
        table.string("cnpj", 100).unique().nullable();
        table.string("email", 100).notNullable().unique();
        table.string("cellphone", 100).notNullable();
        table.string("photo");
        table.integer("roleId").unsigned();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTable("user");
};
