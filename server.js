const http = require("http");

http.createServer((req, res) => {
  console.log(`Server running on port ${PORT}`);
}).listen();