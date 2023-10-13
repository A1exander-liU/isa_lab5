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
          utils.response(200, constants.defaultHeaders, res, JSON.stringify(err));
        });
    }
  }
}

module.exports = sql;