const express = require("express");
const mongoose = require("mongoose");
const router = require("express-promise-router")();
const ProviderController = require("../../controllers/providers");

router
  .route("/")
  .get(ProviderController.index)
  .post(ProviderController.newProvider);

router
  .route("/:id")
  .get(ProviderController.getProvider)
  .put(ProviderController.replaceProvider)
  .patch(ProviderController.updateProvider)
  .delete(ProviderController.deleteProvider);

module.exports = router;
