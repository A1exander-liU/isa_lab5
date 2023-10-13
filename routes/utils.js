function parseUrlSqlQuery(sqlQueryUrl) {
  return sqlQueryUrl.replace(/%20/g, " ");
}

module.exports = {
  parseUrlSqlQuery: parseUrlSqlQuery
};