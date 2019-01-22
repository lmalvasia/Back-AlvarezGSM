var express = require("express");
var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var data = require("../../data/items");
var router = express.Router();

var saveData = function(data) {
  var filePath = path.join(__dirname, "../../data/items.json");
  fs.writeFile(filePath, JSON.stringify(data));
};

router.get("/", function(req, res, next) {
  res.status(200).json(data.list);
});

router.get("/:id", function(req, res, next) {
  var id = req.params.id;
  var product = _.find(data.list, function(item) {
    return item.id.toString() === id.toString();
  });
  if (product) res.status(200).json(product);
  else res.status(404).send("<h1>Not Found</h1>");
});

router.get("/search/:description", function(req, res, next) {
  var description = req.params.description;
  var products = _.filter(data.list, function(item) {
    return item.description.indexOf(description) >= 0;
  });
  res.status(200).json(products);
});

router.patch("/:id", function(req, res, next) {
  res.status(200).json({
    message: "Update item"
  });
});

router.delete("/:id", function(req, res, next) {
  res.status(200).json({
    message: "Delete item"
  });
});

router.post("/", function(req, res, next) {
  var last = _.maxBy(data.list, "id");
  var newItem = Object.assign({ id: last.id + 1 }, req.body);
  data.list.push(newItem);
  saveData(data);
  res.status(201).json(data.list);
});

module.exports = router;
