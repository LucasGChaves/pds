/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.table("user", (table) => {
        table.dropColumn("username");
        table.renameColumn("cellphone", "phone");
        table.renameColumn("photo", "photoFileName");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.table("user", (table) => {
        table.string("username").after("id");
        table.renameColumn("phone", "cellphone");
        table.renameColumn("photoFileName", "photo");
    })
};
