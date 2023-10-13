const http = require("http");
const url = require("url");

const constants = require("./constants");
const sqlRoute = require("./routes/sql.controller");

http.createServer((req, res) => {
  const pathName = url.parse(req.url, true).pathname;
  switch (pathName) {
    case `${constants.basePath}/v1/sql/`: {
      sqlRoute(pathName, req, res);
    }
  }
}).listen(5000);