// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  production: {
client: 'pg',
    connection:
      'postgres://postgres.awemoivicnjsvzulntom:laporan_masyarakat@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
'use_env_variable': 'DATABASE_URL'
  }
};
