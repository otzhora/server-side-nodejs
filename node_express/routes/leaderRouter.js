const express = require("express");
const bodyParser = require("body-parser");

const leadersRouter = express.Router();
leadersRouter.use(bodyParser.json());

leadersRouter
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
    res.end(`Will add the leaders: ${req.body.name} ${req.body.description}`);
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("put not supported on /leaders");
  })
  .delete((req, res, next) => {
    res.end("deleting all leaders");
  });

leadersRouter
  .route("/:leadersId")
  .get((req, res, next) => {
    res.end(`Will send ${req.params.leadersId} to you`);
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(`post not supported on /leaders/${req.params.leadersId}`);
  })
  .put((req, res, next) => {
    res.write(`Updating the leaders ${req.params.leadersId}\n`);
    res.end(`Will update ${req.body.name}, ${req.body.description}`);
  })
  .delete((req, res, next) => {
    res.end(`deleting ${req.params.leadersId}`);
  });

module.exports = leadersRouter;
