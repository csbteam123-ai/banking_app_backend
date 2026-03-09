let {Pool} = require('pg')

const pool = new Pool({
    user: "postgres",
  host: "localhost",
  database: "fast",
  password: "Maruf@12122",
  port: 5432
})



module.exports = pool;