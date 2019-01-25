var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var api = require("./routes/api");
var app = express();
var port = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", api);

app.listen(port, function() {
  console.log("Server complete on localhost:" + port);
});
