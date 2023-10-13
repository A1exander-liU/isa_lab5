const url = require("url");

const utils = require("../utils");
const constants = require("../constants");
const sqlService = require("../services/sql.service");

function sql(path, req, res) {
  switch(req.method) {
    case "GET": {
      sqlService.query(path)
        .then(data => {
          console.log(`controller ITEM: ${data}`);
          utils.response(200, constants.defaultHeaders, res, JSON.stringify(data));
        })
        .catch(err => {
          console.log(`controller ERR: ${err}`);
          utils.response(200, { "Access-Control-Allow-Origin": "*" }, res, err);
        });
        break;
    }
    case "POST": {
      const rows = [
        "Sara Brown", "1901-01-01",
        "John Smith", "1941-01-01",
        "Jack Ma", "1961-01-30",
        "Elon Musk", "1999-01-01"
      ];
      sqlService.insert("insert into Patients (name, dateofbirth) VALUES (?, ?), (?, ?), (?, ?), (?, ?)", rows)
        .then(data => {
          console.log(`controller ITEM: ${data}`);
          utils.response(200, constants.defaultHeaders, res, JSON.stringify(data));
        })
        .catch(err => {
          console.log(`controller ERR: ${err}`);
          utils.response(200, { "Access-Control-Allow-Origin": "*" }, res, err);
        })
        break;
    }
  }
}

module.exports = sql;