/**
 * create your own env.js file in this directory with 1 line of code:
 * module.exports = { username: "your_psql_username", db_name: "your_database_name" };
 */

const env = require('./env');
const pg = require('pg');
const conString = `postgres://${env.username}:@localhost:5432/${env.db_name}`;

const client = new pg.Client(conString);

module.exports = {client};

// opening connection to database & checking it's connected
client.connect( (err) => {
    if (err) {
      return console.error(`Error connecting to postgres: ${err}`);
    }
    client.query('SELECT NOW() AS "theTime"', (err, result) => {
      console.log('Postgres is connected');
      });
});    

/**

=== HELPFUL POSTGRES COMMANDS GETTING STARTED ===
$ createdb new_database_name
$ psql -d database_name >>> to enter postgres console
# \dt => to see tables in database
# \l => to see all databases (and owner of db)
# SELECT * FROM users; => to see all active users
 
 ===== TO CREATE OUR TABLE====
 # CREATE TABLE users(
 id serial PRIMARY KEY,
 email TEXT UNIQUE NOT NULL,
 password TEXT NOT NULL,
 created_on TIMESTAMP NOT NULL,
 text_time TIMESTAMP,
 active_sub BOOL DEFAULT false
);

 */

