var express = require("express");
var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var data = require("../../data/users");
var router = express.Router();

var saveData = function(data) {
  var filePath = path.join(__dirname, "../../data/users.json");
  fs.writeFile(filePath, JSON.stringify(data));
};

router.get("/", function(req, res, next) {
  res.status(200).json(data.list);
});

router.get("/:id", function(req, res, next) {
  var id = req.params.id;
  var user = _.find(data.list, function(item) {
    return item.id.toString() === id.toString();
  });
  if (user) res.status(200).json(user);
  else res.status(404).send("<h1>Not Found</h1>");
});

router.get("/search/:name", function(req, res, next) {
  var name = req.params.name;
  var users = _.filter(data.list, function(item) {
    return item.name.indexOf(name) >= 0;
  });
  res.status(200).json(users);
});

router.patch("/:id", function(req, res, next) {
  res.status(200).json({
    message: "Update user"
  });
});

router.delete("/:id", function(req, res, next) {
  res.status(200).json({
    message: "Delete user"
  });
});

router.post("/", function(req, res, next) {
  var last = _.maxBy(data.list, "id");
  var newUser = Object.assign({ id: last.id + 1 }, req.body);
  data.list.push(newUser);
  saveData(data);
  res.status(201).json(data.list);
});

module.exports = router;
