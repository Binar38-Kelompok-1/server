// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    // connection: {
    //   connectionString:
    //     "postgres://lkfnvmfz:BX0r7silfQ2T5daOI_Yk0KFJEAQKjy5A@rosie.db.elephantsql.com/lkfnvmfz",
    //   ssl: { rejectUnauthorized: false },
    // },
    connection: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "root",
      database: "laporan_masyarakat",
    },
  },
};
