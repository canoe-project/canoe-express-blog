var express = require("express");
var router = express.Router();
var userModule = require("../userModule.js");

router.get("/", async (req, res) => {
  res.send(await userModule.fileLoad("Notice"));
});

module.exports = router;
