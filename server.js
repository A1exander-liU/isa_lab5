const http = require("http");

const PORT = process.env.PORT || 5000;

http.createServer((req, res) => {
  console.log(`Server running on port ${PORT}`);
}).listen(PORT);