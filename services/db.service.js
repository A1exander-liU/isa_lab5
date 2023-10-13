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

  async query(queryString) {
    let connection;
    try {
      connection = await this.pool.getConnection();
      const data = await connection.query(queryString);
      console.log("DATA: " + data);
      return data;
    } catch (err) {
      console.log("ERR: " + err);
      throw err;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
}

const database = new Database();
module.exports = database;