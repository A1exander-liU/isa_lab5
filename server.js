const http = require("http");

http.createServer((req, res) => {
  res.end(`Server is running.`);
}).listen();