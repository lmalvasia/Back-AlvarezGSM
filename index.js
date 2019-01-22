var express = require("express");
var bodyParser = require("body-parser");
var api = require("./routes/api");
var app = express();
var port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", api);

app.listen(port, function() {
  console.log("Server complete on localhost:" + port);
});
