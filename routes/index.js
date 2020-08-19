var express = require("express");
var module = require("../module.js");
var router = express.Router();

router.get("/", (req, res) => {
  res.send(module.fileLoad("Notice"));
});

module.exports = router;
