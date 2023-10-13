const url = require("url");

const utils = require("../utils");
const constants = require("../constants");
const sqlService = require("../services/sql.service");

function sql(path, req, res) {
  switch(req.method) {
    case "GET": {
      sqlService.query(path)
        .then(data => {
          console.log(`controller DATA: ${data}`);
          utils.response(200, constants.defaultHeaders, res, { data: data });
        })
        .catch(err => {
          console.log(`controller ERR: ${err}`);
          utils.response(200, constants.defaultHeaders, res, { error: err.text });
        });
        break;
    }
    case "POST": {
      utils.extractBody(req)
        .then(query => {
          console.log(`QUERY: ${JSON.stringify(query)}`);
          if (query.sql === "") {
            sqlService.fixedInsert()
              .then(data => {
                console.log(`controller DATA: ${data}`);
                utils.response(200, constants.defaultHeaders, res, { data: data });
              })
              .catch(err => {
                console.log(`controller ERR: ${err}`);
                utils.response(200, constants.defaultHeaders, res, { error: err.text });
              })
          } else {
            sqlService.insert(query.sql)
              .then(data => {
                console.log(`controller DATA: ${data}`);
                utils.response(200, constants.defaultHeaders, res, { data: data });
              })
              .catch(err => {
                console.log(`controller ERR: ${err}`);
                utils.response(200, constants.defaultHeaders, res, { error: err.text });
              })
          }
        })
        .catch(err => {
          console.log(`controller ERR: ${err}`);
          utils.response(200, constants.defaultHeaders, res, { error: err.text })
        })
        break;
    }
  }
}

module.exports = sql;