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
    dbService.query(sqlQuery)
      .then(data => {
        return data;
      })
      .catch(err => {
        return err;
      });
  }
}

const sqlService = new SqlService();
module.exports = sqlService;