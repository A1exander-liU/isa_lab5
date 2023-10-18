const http = require("http");
const url = require("url");

const constants = require("./constants");
const utils = require("./utils");
const sqlRoute = require("./routes/sql.controller");

http.createServer((req, res) => {
  console.log(`URL: ${req.url}`);
  const pathName = url.parse(req.url, true).pathname;
  console.log(`QUERY: ${url.parse(req.url, true).path}`);
  if (pathName.search(`${constants.basePath}/v1/sql`) > -1) {
    sqlRoute(pathName, req, res);
  }
  else {
    utils.response(404, constants.defaultHeaders, res, `${pathName} not found`);
  }
}).listen();
