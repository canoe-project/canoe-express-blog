const express = require("express");
const app = express();
const indexRouter = require("./routes/index.js");
const informationRouter = require("./routes/information.js");
const readRouter = require("./routes/read.js");
const managerRouter = require("./routes/manager.js");
const bodyParser = require("body-parser");

var cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.static("./assets/fileData/Notice"));
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "pug");

app.use("/", indexRouter);
app.use("/information", informationRouter);
app.use("/read", readRouter);
app.use("/manager", managerRouter);

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
