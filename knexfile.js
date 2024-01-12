// Update with your config settings.
// const { logger } = require("./src/middleware/Logging");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {
     development: {
          client: "pg",
          connection: {
               connectionString:
                    "postgresql://postgres:root@localhost:5432/belajar_node",
          },
          pool: {
               min: 1,
               max: 15,
          },
          migrations: {
               directory: "./database/migrations",
          },
          seeds: {
               directory: "./database/seeds",
          },
          // debug: true,
          // log: {
          //      warn: (message) => {
          //           logger.warn("Knex warn: ", message);
          //      },
          //      error: (message) => {
          //           logger.error("Knex error: ", message);
          //      },
          //      deprecate: (message) => {
          //           logger.info("Knex deprecate: ", message);
          //      },
          //      debug: (message) => {
          //           logger.info("Knex debug: ", message);
          //      },
          // },
     },
};

module.exports = config;
