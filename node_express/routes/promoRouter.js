const express = require("express");
const bodyParser = require("body-parser");

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter
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
    res.end(`Will add the promo: ${req.body.name} ${req.body.description}`);
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("put not supported on /promotions");
  })
  .delete((req, res, next) => {
    res.end("deleting all promotions");
  });

promoRouter
  .route("/:promoId")
  .get((req, res, next) => {
    res.end(`Will send ${req.params.promoId} to you`);
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(`post not supported on /promotions/${req.params.promoId}`);
  })
  .put((req, res, next) => {
    res.write(`Updating the promo ${req.params.promoId}\n`);
    res.end(`Will update ${req.body.name}, ${req.body.description}`);
  })
  .delete((req, res, next) => {
    res.end(`deleting ${req.params.promoId}`);
  });

module.exports = promoRouter;
