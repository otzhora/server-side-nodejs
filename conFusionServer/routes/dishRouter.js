const express = require("express");
const bodyParser = require("body-parser");

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end(`Will send all to you`);
  })
  .post((req, res, next) => {
    res.end(`Will add the dish: ${req.body.name} ${req.body.description}`);
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("put not supported on /dishes");
  })
  .delete((req, res, next) => {
    res.end("deleting all dishes");
  });

dishRouter
  .route("/:dishId")
  .get((req, res, next) => {
    res.end(`Will send ${req.params.dishId} to you`);
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(`post not supported on /dishes/${req.params.dishId}`);
  })
  .put((req, res, next) => {
    res.write(`Updating the dish ${req.params.dishId}\n`);
    res.end(`Will update ${req.body.name}, ${req.body.description}`);
  })
  .delete((req, res, next) => {
    res.end(`deleting ${req.params.dishId}`);
  });

module.exports = dishRouter;
