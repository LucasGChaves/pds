/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("user", table => {
        table.increments("id").primary();
        table.string("username", 100).notNullable();
        table.string("firstName", 100).notNullable();
        table.string("lastName", 100).notNullable();
        table.string("password", 100).notNullable();
        table.string("cpf", 100).notNullable().unique();
        table.string("crmv", 100).unique();
        table.string("cnpj", 100).unique();
        table.string("email", 100).notNullable().unique();
        table.string("cellphone", 100).notNullable();
        table.binary("photo").notNullable();
        table.integer("roleId").unsigned();
    }).then(function (){
        return knex("user").insert([
            {
                username: "lucas_chaves",
                firstName: "Lucas",
                lastName: "Chaves",
                password: "changePassword123",
                cpf: "249.483.620-42",
                email: "lucas_chaves@fake_email.com",
                cellphone: "(99)99999-9999",
                photo: 0b0,
                roleId: 1
            },
            {
                username: "veterinario",
                firstName: "Vet",
                lastName: "Erinario",
                password: "changePassword123",
                cpf: "856.083.400-19",
                crmv: "0",
                cnpj: "17.665.338/0001-65",
                email: "veterinario@fake_email.com",
                cellphone: "(99)99999-9999",
                photo: 0b01,
                roleId: 2
            }
        ]);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("user");
};
