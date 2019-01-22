var express = require("express");
var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var data = require("../../data/customers");
var router = express.Router();

var saveData = function(data) {
  var filePath = path.join(__dirname, "../../data/customers.json");
  fs.writeFile(filePath, JSON.stringify(data));
};

router.get("/", function(req, res, next) {
  res.status(200).json(data.list);
});

router.get("/:id", function(req, res, next) {
  var id = req.params.id;
  var customer = _.find(data.list, function(item) {
    return item.id.toString() === id.toString();
  });
  if (customer) res.status(200).json(customer);
  else res.status(404).send("<h1>Not Found</h1>");
});

router.get("/search/:name", function(req, res, next) {
  var name = req.params.name;
  var customers = _.filter(data.list, function(item) {
    return item.name.indexOf(name) >= 0;
  });
  res.status(200).json(customers);
});

router.patch("/:id", function(req, res, next) {
  res.status(200).json({
    message: "Update customer"
  });
});

router.delete("/:id", function(req, res, next) {
  res.status(200).json({
    message: "Delete customer"
  });
});

router.post("/", function(req, res, next) {
  var last = _.maxBy(data.list, "id");
  var newCustomer = Object.assign({ id: last.id + 1 }, req.body);
  data.list.push(newCustomer);
  saveData(data);
  res.status(201).json(data.list);
});

module.exports = router;
