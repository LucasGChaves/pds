/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema.alterTable("vaccine", (table)=> {
        table.dropForeign("petId");
        table.foreign("petId").references("pet.id").onDelete("CASCADE").onUpdate("CASCADE");

        table.integer("vetId").unsigned().nullable().alter();
        table.dropForeign("vetId");
        table.foreign("vetId").references("user.id").onDelete("SET NULL").onUpdate("CASCADE");
    }).then(knex.schema.alterTable("examRequest", (table) => {
        table.dropForeign("petId");
        table.foreign("petId").references("pet.id").onDelete("CASCADE").onUpdate("CASCADE");

        table.dropForeign("vetId");
        table.setNullable("vetId");
        table.foreign("vetId").references("user.id").onDelete("SET NULL").onUpdate("CASCADE");
    })).then(knex.schema.alterTable("appointment", (table) => {
        table.dropForeign("petId");
        table.setNullable("petId");
        table.foreign("petId").references("pet.id").onDelete("SET NULL").onUpdate("CASCADE");

        table.dropForeign("vetId");
        table.foreign("vetId").references("user.id").onDelete("CASCADE").onUpdate("CASCADE");
    }));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
    return knex.schema.alterTable("vaccine", (table)=> {
        table.dropForeign("petId");
        table.foreign("petId").references("pet.id");

        table.dropForeign("vetId");
        table.dropNullable("vetId");
        table.foreign("vetId").references("user.id");
    }).then(knex.schema.alterTable("examRequest", (table) => {
        table.dropForeign("petId");
        table.foreign("petId").references("pet.id");

        table.dropForeign("vetId");
        table.dropNullable("vetId");
        table.foreign("vetId").references("user.id");
    })).then(knex.schema.alterTable("appointment", (table) => {
        table.dropForeign("petId");
        table.dropNullable("petId");
        table.foreign("petId").references("pet.id");

        table.dropForeign("vetId");
        table.foreign("vetId").references("user.id");
    }));
};
