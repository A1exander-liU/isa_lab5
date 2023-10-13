const url = require("url");

function parseUrlSqlQuery(sqlQueryUrl) {
  return sqlQueryUrl.replace(/%20/g, " ");
}

function response(statusCode, headers, res, data) {
  res.writeHead(statusCode, headers ? headers : {});
  if (headers["Content-Type"] === "application/json") {
    res.write(JSON.stringify(data));
  } else {
    res.write(data);
  }
  res.end();
}

function extractBody(req) {
  return new Promise((resolve, reject) => {
    let body = [];
    req
      .on("error", err => {
        reject(err);
      })
      .on("data", chunk => {
        body.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(body).toString();
        resolve(url.parse(body, true).query);
      })
  })
}

module.exports = {
  parseUrlSqlQuery: parseUrlSqlQuery,
  response: response,
  extractBody: extractBody
};