const express = require("express");
const mongoose = require("mongoose");
const router = require("express-promise-router")();
const PurchaseController = require("../../controllers/purchases.js");

router
  .route("/")
  .get(PurchaseController.index)
  .post(PurchaseController.newPurchase);

router
  .route("/:id")
  .get(PurchaseController.getPurchase)
  .put(PurchaseController.replacePurchase)
  .patch(PurchaseController.updatePurchase)
  .delete(PurchaseController.deletePurchase);

router
  .route("/:id/products")
  .get(PurchaseController.getPurchase_Products)
  .post(PurchaseController.newPurchase_Product);

module.exports = router;
