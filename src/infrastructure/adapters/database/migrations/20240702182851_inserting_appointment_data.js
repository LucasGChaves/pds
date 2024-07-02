/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {

    await knex.schema.alterTable("appointment", (table) => {
        table.string("appointmentTime", 100).notNullable().after("appointmentDate");
        table.boolean("scheduled").notNullable().after("description");
    });

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

    await knex("appointment").insert([
        {
            "appointmentDate": "2024-10-10",
            "appointmentTime": "09:00",
            "scheduled": false,
            "vetId": vetMarinaId
        },
        {
            "appointmentDate": "2024-10-10",
            "appointmentTime": "09:30",
            "scheduled": false,
            "vetId": vetMarinaId
        },
        {
            "appointmentDate": "2024-10-10",
            "appointmentTime": "10:00",
            "scheduled": false,
            "vetId": vetMarinaId
        },
        {
            "appointmentDate": "2024-10-10",
            "appointmentTime": "10:30",
            "scheduled": false,
            "vetId": vetMarinaId
        },
        {
            "appointmentDate": "2024-10-10",
            "appointmentTime": "11:00",
            "scheduled": true,
            "vetId": vetMarinaId,
            "petId": petBelaId
        },
        {
            "appointmentDate": "2024-10-10",
            "appointmentTime": "13:00",
            "scheduled": true,
            "description": "Lorem ipsum sit dolor amet.",
            "vetId": vetMarinaId,
            "petId": petJadeId
        },
        {
            "appointmentDate": "2024-10-10",
            "appointmentTime": "13:00",
            "scheduled": true,
            "description": "Lorem ipsum sit dolor amet.",
            "vetId": vetMarinaId,
            "petId": petBobId
        }
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {};
