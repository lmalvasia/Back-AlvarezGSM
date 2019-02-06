var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var api = require("./routes/api");
var app = express();
var port = 3000;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb://admin:" +
    process.env.MONGO_ATLAS_PW +
    "@alvarezgsm-shard-00-00-z43tn.mongodb.net:27017,alvarezgsm-shard-00-01-z43tn.mongodb.net:27017,alvarezgsm-shard-00-02-z43tn.mongodb.net:27017/test?ssl=true&replicaSet=AlvarezGSM-shard-0&authSource=admin&retryWrites=true",
  { useNewUrlParser: true, useCreateIndex: true }
);

mongoose.Promise = global.Promise;

app.use("/api", api);

app.listen(port, function() {
  console.log("Server complete on localhost:" + port);
});
