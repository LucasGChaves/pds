/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.table("user", (table) => {
        table.setNullable("crmv");
        table.dropColumn("cnpj");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.table("user", (table) => {
        table.dropNullable("crmv");
        table.string("crmv", 100).unique().nullable().after("cpf");
    });
};
