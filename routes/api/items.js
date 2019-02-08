const express = require("express");
const mongoose = require("mongoose");
const router = require("express-promise-router")();
const ItemController = require("../../controllers/items");

router
  .route("/")
  .get(ItemController.index)
  .post(ItemController.newItem);

router
  .route("/:id")
  .get(ItemController.getItem)
  .put(ItemController.replaceItem)
  .patch(ItemController.updateItem)
  .delete(ItemController.deleteItem);

module.exports = router;
