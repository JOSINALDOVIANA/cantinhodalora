// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default  {

  development: {
    client: 'sqlite3', // or 'better-sqlite3'
    connection: {
      filename: "./src/databases/mydb.sqlite"
    },
    seeds: {
      directory: './src/databases/seeds'
  },
  migrations: {
    directory: './src/databases/migrations'
  },
useNullAsDefault:true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
