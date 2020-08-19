var express = require("express");
var router = express.Router();
var userModule = require("../userModule.js");

router.get("/", async (req, res) => {
  var i = await userModule.fileLoad("Notice");
  res.send(i);
});

module.exports = router;
