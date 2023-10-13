function parseUrlSqlQuery(sqlQueryUrl) {
  return sqlQueryUrl.replace(/%20/g, " ");
}

function response(statusCode, headers={}, res, data) {
  res.writeHead(statusCode, headers);
  if (headers["Content-Type"] === "application/json") {
    res.write(JSON.stringify(data));
  } else {
    res.write(data);
  }
  res.end();
}

module.exports = {
  parseUrlSqlQuery: parseUrlSqlQuery,
  response: response
};