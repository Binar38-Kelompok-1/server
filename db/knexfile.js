// Update with your config settings.
require("dotenv").config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const database = process.env.DATABASE_URL;

module.exports = {
  production: {
    client: "pg",
    connection: database,
    use_env_variable: "DATABASE_URL",
  },
};
