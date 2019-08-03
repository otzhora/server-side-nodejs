const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../authenticate");
const Promitions = require("../models/promotions");

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter
  .route("/")
  .get((req, res, next) => {
    Promitions.find({})
      .then(promition => {
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.json(promition);
      })
      .catch(err => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Promitions.create(req.body)
      .then(promotion => {
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.json(promotion);
      })
      .catch(err => next(err));
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("put not supported on /promotions");
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Promitions.deleteMany({})
      .then(resp => {
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.json(resp);
      })
      .catch(err => next(err));
  });

promoRouter
  .route("/:promoId")
  .get((req, res, next) => {
    Promitions.findById(req.params.promoId)
      .then(promotion => {
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.json(promotion);
      })
      .catch(err => next(err));
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(`post not supported on /promotions/${req.params.promoId}`);
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    Promitions.findByIdAndUpdate(
      req.params.promoId,
      {
        $set: req.body
      },
      { new: true }
    )
      .then(promition => {
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.json(promition);
      })
      .catch(err => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Promitions.findByIdAndRemove(req.params.promoId)
      .then(resp => {
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.json(resp);
      })
      .catch(err => next(err));
  });

module.exports = promoRouter;
