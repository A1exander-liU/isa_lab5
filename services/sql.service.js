const dbService = require("./db.service");

class SqlService {
  constructor() {  }

  extractSqlQuery(url) {
    const split = url.split("/");
    const sqlQueryEncoded = split[split.length - 1];
    return sqlQueryEncoded.replace(/%20/g, " ");
  }

  async query(url) {
    const sqlQuery = this.extractSqlQuery(url);
    console.log(`QUERY: ${sqlQuery}`);
    try {
      const data = await dbService.query(sqlQuery);
      console.log(`sqlservice DATA: ${JSON.stringify(data)}`);
      return data;
    } catch (err) {
        console.log(`sqlservice ERR: ${JSON.stringify(err)}`);
        throw err;
    }
  }

  async fixedInsert() {
    const rows = [
      "Sara Brown", "1901-01-01",
      "John Smith", "1941-01-01",
      "Jack Ma", "1961-01-30",
      "Elon Musk", "1999-01-01"
    ];
    try {
      const result = await this.insert("INSERT INTO Patients (name, dateofbirth) VALUES (?, ?), (?, ?), (?, ?), (?, ?)", rows);
      console.log(`sqlservice DATA: ${result}`);
      return result;
    } catch (err) {
      console.log(`sqlservice ERR: ${err}`);
      throw err;
    }
  }

  async insert(sqlQuery, data) {
    try {
      const result = await dbService.query(sqlQuery, data);
      console.log(`sqlservice DATA: ${result}`);
      return result;
    } catch (err) {
      console.log(`sqlservice ERR: ${err}`);
      throw err;
    }
  }
}

const sqlService = new SqlService();
module.exports = sqlService;