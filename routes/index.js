var express = require("express");
var router = express.Router();
var userModule = require("../userModule.js");

router.get("/", (req, res) => {
  res.send("hello world");
});

router.get("/data", async (req, res) => {
  res.send(await userModule.fileLoad("Notice"));
});

module.exports = router;
