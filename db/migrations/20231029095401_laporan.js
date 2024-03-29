/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("laporan", (table) => {
    table.increments("id_laporan").primary();
    table.text("isi_laporan");
    table.boolean("status");
    table.string("foto");
    table
      .integer("id_masyarakat")
      .references("id")
      .inTable("masyarakat")
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
  return knex.schema.dropTable("laporan");
};
