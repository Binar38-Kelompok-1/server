/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("balasan", (table) => {
    table.increments("id_balasan").primary();
    table.text("isi_balasan");
    table.integer("id_laporan").references("id_laporan").inTable("laporan");
    table
      .integer("id_petugas")
      .references("id")
      .inTable("petugas")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("balasan");
};
