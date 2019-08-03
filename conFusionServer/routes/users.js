var express = require("express");
var bodyParser = require("body-parser");
var User = require("../models/user");
var router = express.Router();
var passport = require("passport");
var authenticate = require("../authenticate");

router.use(bodyParser.json());

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", function(req, res, next) {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-type", "application/json");
        res.json({ err });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.statusCode = 200;
          res.setHeader("Content-type", "application/json");
          res.json({ status: "Registration succesful", success: true });
        });
      }
    }
  );
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  var token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-type", "application/json");
  res.json({ status: "You are logged in", token, success: true });
});

router.get("/logout", function(req, res, next) {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    var err = new Error("You are not logged in!");
    err.status = 403;
    next(err);
  }
});

module.exports = router;
