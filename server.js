const http = require("http");

const db = require("./db.service");

http.createServer((req, res) => {
  db.query("SELECT * FROM Patients")
    .then(value => {
      res.end(value);
    })
    .catch(err => {
      res.end(err);
    })
}).listen();