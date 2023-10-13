const mariadb = require("mariadb");

const env = { 
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB
};

class Database {
  constructor() {
    this.host = env.host;
    this.database = env.database;
    this.user = env.user;
    this.password = env.password;
    this.pool = this.createPool();
  }

  createPool(maxConnections=5) {
    const pool = mariadb.createPool({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
      connectionLimit: maxConnections
    });
    return pool;
  }

  async query(queryString, rows) {
    let connection;
    try {
      connection = await this.pool.getConnection();
      let data;
      if (rows) {
        data = await connection.query({ sql: queryString, insertIdAsNumber: true }, rows);
        
      } else {
        data = await connection.query({ sql: queryString, bigIntAsNumber: true, insertIdAsNumber: true });
      }
      console.log("dbservice DATA: " + JSON.stringify(data));
      return data;
    } catch (err) {
      console.log("dbservice ERR: " + err);
      throw err;
    } finally {
      if (connection) {
        connection.end();
      }
    }
  }
}

const database = new Database();
module.exports = database;