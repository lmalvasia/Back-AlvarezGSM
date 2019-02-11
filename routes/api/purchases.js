const router = require("express-promise-router")();
const PurchaseController = require("../../controllers/purchases.js");
const { validateParam, schemas } = require("../../helpers/routeHelpers");

router
  .route("/")
  .get(PurchaseController.index)
  .post(PurchaseController.newPurchase);

router
  .route("/:id")
  .get(validateParam(schemas.idSchema, "id"), PurchaseController.getPurchase)
  .put(
    validateParam(schemas.idSchema, "id"),
    PurchaseController.replacePurchase
  )
  .patch(
    validateParam(schemas.idSchema, "id"),
    PurchaseController.updatePurchase
  )
  .delete(
    validateParam(schemas.idSchema, "id"),
    PurchaseController.deletePurchase
  );

router
  .route("/:id/products")
  .get(
    validateParam(schemas.idSchema, "id"),
    PurchaseController.getPurchase_Products
  )
  .post(
    validateParam(schemas.idSchema, "id"),
    PurchaseController.newPurchase_Product
  );

module.exports = router;
