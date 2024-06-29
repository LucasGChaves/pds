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
    }).then(function (){
        return knex("user").insert([
            {
                username: "lucas_chaves",
                firstName: "Lucas",
                lastName: "Chaves",
                password: "changePassword123",
                cpf: "249.483.620-42",
                email: "lucas_chaves@fake_email.com",
                phone: "(99)99999-9999",
                photo: "lucaschaves_photo",
                roleId: 1
            },
            {
                username: "veterinario",
                firstName: "Vet",
                lastName: "Vet",
                password: "changePassword123",
                cpf: "856.083.400-19",
                crmv: "0",
                cnpj: "17.665.338/0001-65",
                email: "veterinario@fake_email.com",
                phone: "(99)99999-9999",
                photo: "vet_photo",
                roleId: 2
            }
        ]);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.dropTable("user");
};
