var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/read", (req, res) => {
  res.render("read");
});

module.exports = router;
