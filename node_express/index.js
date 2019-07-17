const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dishRouter = require("./routes/dishRouter");

const hostname = "localhost";
const port = 3000;

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/dishes", dishRouter);

// move following to dishRouter
/* app.get("/dishes/:dishId", (req, res, next) => {
  res.end(`Will send ${req.params.dishId} to you`);
});

app.post("/dishes/:dishId", (req, res, next) => {
  res.statusCode = 403;
  res.end(`post not supported on /dishes/${req.params.dishId}`);
});

app.put("/dishes/:dishId", (req, res, next) => {
  res.write(`Updating the dish ${req.params.dishId}\n`);
  res.end(`Will update ${req.body.name}, ${req.body.description}`);
});

app.delete("/dishes/:dishId", (req, res, next) => {
  res.end(`deleting ${req.params.dishId}`);
}); */

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("expreeeees");
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`server running on ${hostname}:${port}`);
});
