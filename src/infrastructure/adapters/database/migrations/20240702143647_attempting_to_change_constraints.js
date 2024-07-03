/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.table("address", (table)=> {
        if(knex.schema.hasColumn("address", "userId")){
            table.dropForeign("userId");
        }
        table.foreign("userId").references("user.id").onDelete("CASCADE").onUpdate("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.table("address", (table)=> {
        table.dropForeign("userId");
    });
};
