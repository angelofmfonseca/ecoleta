import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("items_locals", (table) => {
    table.increments("id").primary();
    table.integer("locals_id").notNullable().references("id").inTable("locals");
    table.integer("items_id").notNullable().references("id").inTable("items");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("items_locals");
}
