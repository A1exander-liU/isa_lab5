function parseUrlSqlQuery(sqlQueryUrl) {
  return sqlQueryUrl.replace(/%20/g, " ");
}

function response(statusCode, headers={}, res, data) {
  res.writeHead(statusCode, headers);
  res.write(JSON.stringify(data));
  res.end();
}

module.exports = {
  parseUrlSqlQuery: parseUrlSqlQuery,
  response: response
};