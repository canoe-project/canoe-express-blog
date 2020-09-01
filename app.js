var express = require("express");
var app = express();
var indexRouter = require("./routes/index.js");
var informationRouter = require("./routes/information.js");

app.use(express.static("./assets/fileData/Notice"));
app.use(express.static("public"));

app.set("view engine", "pug");

app.use("/", indexRouter);
app.use("/information", informationRouter);
app.use(function (req, res, next) {
  res.status(404).send("Sorry cant find that!");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
