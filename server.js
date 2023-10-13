const http = require("http");

const db = require("./db.service");

function sendRequest(res, code, headers={ "Access-Control-Allow-Origin": "*" }, data) {
  res.writeHead(code, headers);
  res.write(JSON.stringify(data));
  res.end();
}

http.createServer((req, res) => {
  db.query("SELECT * FROM Patients")
    .then(value => {
      sendRequest(res, 200, { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" }, value);
    })
    .catch(err => {
      sendRequest(res, 404, { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" }, err);
    })
}).listen();