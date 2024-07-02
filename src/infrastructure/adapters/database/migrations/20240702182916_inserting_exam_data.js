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
    let vetMarinaSig = vetMarina.firstName + " " + vetMarina.lastName + "/CRMV " + vetMarina.crmv;

    // let vetLeticia = knex("user").where("email", "LetíciaMelo@email.com").first();
    // let vetLeticiaId = vetLeticia.id;

    // let vetAlice = knex("user").where("email", "AliceRocha@email.com").first();
    // let vetAliceId = vetAlice.id;

    let appointmentBelaMarina = await knex("appointment").where("petId", petBelaId).andWhere("vetId", vetMarinaId).first();
    let appointmentJadeMarina = await knex("appointment").where("petId", petJadeId).andWhere("vetId", vetMarinaId).first();
    let appointmentBobMarina = await knex("appointment").where("petId", petBobId).andWhere("vetId", vetMarinaId).first();

    let appointmentBelaMarinaId = appointmentBelaMarina.id;
    let appointmentJadeMarinaId = appointmentJadeMarina.id;
    let appointmentBobMarinaId = appointmentBobMarina.id;

    await knex("examRequest").insert([
        {
            "vetSignature": vetMarinaSig,
            "petId": petBelaId,
            "vetId": vetMarinaId,
            "appointmentId": appointmentBelaMarinaId
        },
        {
            "vetSignature": vetMarinaSig,
            "petId": petJadeId,
            "vetId": vetMarinaId,
            "appointmentId": appointmentJadeMarinaId,
        },
        {
            "vetSignature": vetMarinaSig,
            "petId": petBobId,
            "vetId": vetMarinaId,
            "appointmentId": appointmentBobMarinaId,
            "result": "Lorem ipsum sit dolor amet."
        }
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {};
