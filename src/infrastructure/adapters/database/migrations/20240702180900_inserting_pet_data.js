/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
    let userKai = await knex("user").where("email", "KaiLima@email.com").first();
    let userKaiId = userKai.id;

    let userEstevan = await knex("user").where("email", "EstevanDias@email.com").first();
    let userEstevanId = userEstevan.id;

    let userEnzo = await knex("user").where("email", "EnzoAzevedo@email.com").first();
    let userEnzoId = userEnzo.id;

    await knex("pet").insert([
        {
            "name": "Bela",
            "birthDate": "2016-06-14",
            "species": "dog",
            "breed": "maltese",
            "ownerId": userKaiId
        },
        {
            "name": "Jade",
            "birthDate": "2022-01-11",
            "species": "cat",
            "breed": "stray",
            "ownerId": userKaiId
        },
        {
            "name": "Bob",
            "birthDate": "2022-01-11",
            "species": "dog",
            "breed": "stray",
            "ownerId": userKaiId
        },
        {
            "name": "Rex",
            "birthDate": "2022-01-11",
            "species": "dog",
            "breed": "stray",
            "ownerId": userEstevanId
        },
        {
            "name": "Dunga",
            "birthDate": "2022-01-11",
            "species": "dog",
            "breed": "stray",
            "ownerId": userEstevanId
        },
        {
            "name": "Van Dame",
            "birthDate": "2022-01-11",
            "species": "cockatiel",
            "ownerId": userEstevanId
        },
        {
            "name": "Pierre",
            "birthDate": "2022-01-11",
            "species": "dog",
            "breed": "stray",
            "ownerId": userEnzoId
        },
        {
            "name": "Tom",
            "birthDate": "2022-01-11",
            "species": "cat",
            "breed": "stray",
            "ownerId": userEnzoId
        },
        {
            "name": "Pepe",
            "birthDate": "2022-01-11",
            "species": "dog",
            "breed": "stray",
            "ownerId": userEnzoId
        }
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {};
