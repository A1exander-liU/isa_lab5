const http = require("http");
const url = require("url");

const constants = require("./constants");
const utils = require("./utils");
const sqlRoute = require("./routes/sql.controller");

http.createServer((req, res) => {
  const pathName = url.parse(req.url, true).pathname;
  if (pathName.search(`${constants.basePath}/v1/sql`) > -1) {
    sqlRoute(pathName, req, res);
  }
  else {
    utils.response(404, constants.defaultHeaders, res, `${pathName} not found`);
  }
}).listen();