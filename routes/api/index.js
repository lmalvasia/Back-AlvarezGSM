var express = require("express");
var cors = require("cors");
var customers = require("./customers");
var providers = require("./providers");
var users = require("./users");
var repairs = require("./repairs");
var purchases = require("./purchases");
var sales = require("./sales");
var items = require("./items");
var router = require("express-promise-router")();

router.use(cors());

router.use("/customers", customers);
router.use("/providers", providers);
router.use("/admin/users", users);
router.use("/repairs", repairs);
router.use("/purchases", purchases);
router.use("/sales", sales);
router.use("/items", items);

module.exports = router;
