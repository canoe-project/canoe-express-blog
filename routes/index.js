var express = require("express");
var router = express.Router();
var userModule = require("../userModule.js");
var path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "/public/main.html"));
});
router.get("/data", async (req, res) => {
  res.send(await userModule.fileLoad("Notice"));
});

module.exports = router;
