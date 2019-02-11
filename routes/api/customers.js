const express = require("express");
const mongoose = require("mongoose");
const router = require("express-promise-router")();
const CustomerController = require("../../controllers/customers");
const { validateParam } = require("../../helpers/routeHelpers");

router
  .route("/")
  .get(CustomerController.index)
  .post(CustomerController.newCustomer);

router
  .route("/:id")
  .get(CustomerController.getCustomer)
  .put(CustomerController.replaceCustomer)
  .patch(CustomerController.updateCustomer)
  .delete(CustomerController.deleteCustomer);

module.exports = router;
