import bcrypt from "bcrypt";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function(knex) {
    const users = await knex("user").where("id", ">", "0").andWhere("id", "!=", "69");

    console.log("users: " + users);

    for (const user of users) {
        let hashedPassword = await bcrypt.hash("password", 10);
        await knex("user").where("id", user.id).update({ password: hashedPassword });
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {};
