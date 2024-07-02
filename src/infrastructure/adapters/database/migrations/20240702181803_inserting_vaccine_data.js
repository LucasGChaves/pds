/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
    let petBela = await knex("pet").where("name", "Bela").first();
    let petBelaId = petBela.id;

    let petJade = await knex("pet").where("name", "Jade").first();
    let petJadeId = petJade.id;

    let petBob = await knex("pet").where("name", "Bob").first();
    let petBobId = petBob.id;

    let vetMarina = await knex("user").where("email", "MarinaOliveira@email.com").first();
    let vetMarinaId = vetMarina.id;

    // let vetLeticia = knex("user").where("email", "LetíciaMelo@email.com").first();
    // let vetLeticiaId = vetLeticia.id;

    // let vetAlice = knex("user").where("email", "AliceRocha@email.com").first();
    // let vetAliceId = vetAlice.id;

    await knex("vaccine").insert([
        {
            "vaccineName": "Vax",
            "manufacturer": "VaxCorp",
            "batch": "2023-12-01",
            "applicationDate": "2024-01-01",
            "petId": petBelaId,
            "vetId": vetMarinaId
        },
        {
            "vaccineName": "Vax",
            "manufacturer": "VaxCorp",
            "batch": "2023-12-01",
            "applicationDate": "2024-01-01",
            "petId": petJadeId,
            "vetId": vetMarinaId
        },
        {
            "vaccineName": "Vax",
            "manufacturer": "VaxCorp",
            "batch": "2023-12-01",
            "applicationDate": "2024-01-01",
            "petId": petBobId,
            "vetId": vetMarinaId
        },
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {};
