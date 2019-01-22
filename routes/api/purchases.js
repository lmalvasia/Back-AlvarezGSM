var express = require("express");
var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var data = require("../../data/purchases");
var router = express.Router();

var saveData = function(data) {
  var filePath = path.join(__dirname, "../../data/purchases.json");
  fs.writeFile(filePath, JSON.stringify(data));
};

router.get("/", function(req, res, next) {
  res.status(200).json(data.list);
});

router.get("/:id", function(req, res, next) {
  var id = req.params.id;
  var purchase = _.find(data.list, function(item) {
    return item.id.toString() === id.toString();
  });
  if (purchase) res.status(200).json(purchase);
  else res.status(404).send("<h1>Not Found</h1>");
});

router.patch("/:id", function(req, res, next) {
  res.status(200).json({
    message: "Update purchase"
  });
});

router.delete("/:id", function(req, res, next) {
  res.status(200).json({
    message: "Delete purchase"
  });
});

router.post("/", function(req, res, next) {
  var last = _.maxBy(data.list, "id");
  var newPurchase = Object.assign({ id: last.id + 1 }, req.body);
  data.list.push(newPurchase);
  saveData(data);
  res.status(201).json(data.list);
});
module.exports = router;
