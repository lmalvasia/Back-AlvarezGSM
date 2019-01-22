var express = require("express");
var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var data = require("../../data/repairs");
var router = express.Router();

var saveData = function(data) {
  var filePath = path.join(__dirname, "../../data/repairs.json");
  fs.writeFile(filePath, JSON.stringify(data));
};

router.get("/", function(req, res, next) {
  res.status(200).json(data.list);
});

router.get("/:id", function(req, res, next) {
  var id = req.params.id;
  var repair = _.find(data.list, function(item) {
    return item.id.toString() === id.toString();
  });
  if (repair) res.status(200).json(repair);
  else res.status(404).send("<h1>Not Found</h1>");
});

router.patch("/:id", function(req, res, next) {
  res.status(200).json({
    message: "Update repair"
  });
});

router.delete("/:id", function(req, res, next) {
  res.status(200).json({
    message: "Delete repair"
  });
});

router.post("/", function(req, res, next) {
  var last = _.maxBy(data.list, "id");
  var newRepair = Object.assign({ id: last.id + 1 }, req.body);
  data.list.push(newRepair);
  saveData(data);
  res.status(201).json(data.list);
});
module.exports = router;
