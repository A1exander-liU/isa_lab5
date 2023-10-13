const http = require("http");

const db = require("./db.service");

http.createServer((req, res) => {
  console.log(process.env);
  db.query("SELECT * FROM Patients").then(value => {
    res.end(value);
  })
}).listen();