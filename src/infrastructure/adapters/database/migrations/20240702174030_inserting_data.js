/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
    await knex("user").insert([
        {
            "firstName": "Kai",
            "lastName": "Lima",
            "password": "password",
            "email": "KaiLima@email.com",
            "phone": "99988475185",
            "cpf": "34758271070",
            "roleId": 1
        },
        {
            "firstName": "Marina",
            "lastName": "Oliveira",
            "password": "password",
            "email": "MarinaOliveira@email.com",
            "phone": "27981445575",
            "cpf": "65848325030",
            "crmv": "0000",
            "roleId": 2
        },
        {
            "firstName": "Estevan",
            "lastName": "Dias",
            "password": "password",
            "email": "EstevanDias@email.com",
            "phone": "84973740432",
            "cpf": "80407640096",
            "roleId": 1
        },
        {
            "firstName": "Letícia",
            "lastName": "Melo",
            "password": "password",
            "email": "LetíciaMelo@email.com",
            "phone": "79988414360",
            "cpf": "08490084092",
            "crmv": "0001",
            "roleId": 2
        },
        {
            "firstName": "Enzo",
            "lastName": "Azevedo",
            "password": "password",
            "email": "EnzoAzevedo@email.com",
            "phone": "67971780122",
            "cpf": "00236552082",
            "roleId": 1
        },
        {
            "firstName": "Alice",
            "lastName": "Rocha",
            "password": "password",
            "email": "AliceRocha@email.com",
            "phone": "44981532112",
            "cpf": "88942328083",
            "crmv": "0002",
            "roleId": 2
        }
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {};
