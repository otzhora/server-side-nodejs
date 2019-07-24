const express = require("express");
const bodyParser = require("body-parser");

const Leaders = require("../models/leaders");
const leadersRouter = express.Router();
leadersRouter.use(bodyParser.json());

leadersRouter
  .route("/")
  .get((req, res, next) => {
    Leaders.find({})
      .then(leader => {
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.json(leader);
      })
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    Leaders.create(req.body)
      .then(leader => {
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.json(leader);
      })
      .catch(err => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("put not supported on /leaders");
  })
  .delete((req, res, next) => {
    Leaders.deleteMany({})
      .then(resp => {
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.json(resp);
      })
      .catch(err => next(err));
  });

leadersRouter
  .route("/:leaderId")
  .get((req, res, next) => {
    Leaders.findById(req.params.leaderId)
      .then(leader => {
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.json(leader);
      })
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end(`post not supported on /leaders/${req.params.leaderId}`);
  })
  .put((req, res, next) => {
    Leaders.findByIdAndUpdate(
      req.params.leaderId,
      {
        $set: req.body
      },
      { new: true }
    )
      .then(leader => {
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.json(leader);
      })
      .catch(err => next(err));
  })
  .delete((req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
      .then(resp => {
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.json(resp);
      })
      .catch(err => next(err));
  });

module.exports = leadersRouter;
