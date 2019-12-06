module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data.db3',
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        // after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done); // turn on foriegn key enforcement
      },
    },
    migrations: {
      directory: './js/data/migrations',
    },
    seeds: {
      directory: './js/data/seeds',
    },
  },
};
