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

    let vetMarina = await knex("user").where("email", "MarinaOliveira@email.com").first();
    let vetMarinaId = vetMarina.id;

    let vetLeticia = await knex("user").where("email", "LetíciaMelo@email.com").first();
    let vetLeticiaId = vetLeticia.id;

    let vetAlice = await knex("user").where("email", "AliceRocha@email.com").first();
    let vetAliceId = vetAlice.id;

    await knex("address").insert([
        {
            "state": "Minas Gerais",
            "city": "Belo Horizonte",
            "district": "Bairro X",
            "street": "Rua X",
            "number": 123,
            "userId": userKaiId
        },
        {
            "state": "Minas Gerais",
            "city": "Belo Horizonte",
            "district": "Bairro X",
            "street": "Rua X",
            "number": 1,
            "userId": userEstevanId
        },
        {
            "state": "Minas Gerais",
            "city": "Belo Horizonte",
            "district": "Bairro X",
            "street": "Rua X",
            "number": 23,
            "userId": userEnzoId
        },
        {
            "state": "Minas Gerais",
            "city": "Belo Horizonte",
            "district": "Bairro X",
            "street": "Rua X",
            "number": 12,
            "userId": vetMarinaId
        },
        {
            "state": "Minas Gerais",
            "city": "Belo Horizonte",
            "district": "Bairro X",
            "street": "Rua X",
            "number": 1234,
            "userId": vetLeticiaId
        },
        {
            "state": "Minas Gerais",
            "city": "Belo Horizonte",
            "district": "Bairro X",
            "street": "Rua X",
            "number": 234,
            "userId": vetAliceId
        }
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {};
