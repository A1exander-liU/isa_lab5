const http = require("http");

http.createServer((req, res) => {
  console.log(process.env.TEST);
  res.end(`Server is running.`);
}).listen();