const http = require("http");
const fs = require("fs");
const path = require("path");
const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(`requiest for: ${req.url} by method ${req.method}`);

  if (req.method != "GET") {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(`<html><body><h1>${req.method} not supported </h1></body></html>`);

    return;
  }

  let fileUrl = req.url == "/" ? "/index.html" : req.url;
  let filePath = path.resolve(`./public${fileUrl}`);
  const fileExt = path.extname(filePath);

  if (fileExt != ".html") {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(`<html><body><h1>${fileUrl} not an html file</h1></body></html>`);

    return;
  }

  if (!fs.existsSync(filePath)) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(`<html><body><h1>${fileUrl} not found</h1></body></html>`);

    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  fs.createReadStream(filePath).pipe(res);
});

server.listen(port, hostname, () => {
  console.log(`running on ${hostname}:${port}`);
});
