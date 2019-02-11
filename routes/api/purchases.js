const router = require("express-promise-router")();
const PurchaseController = require("../../controllers/purchases.js");
const {
  validateParam,
  validateBody,
  schemas
} = require("../../helpers/routeHelpers");

router
  .route("/")
  .get(PurchaseController.index)
  .post(validateBody(schemas.purchaseSchema), PurchaseController.newPurchase);

router
  .route("/:id")
  .get(validateParam(schemas.idSchema, "id"), PurchaseController.getPurchase)
  .put(
    [
      validateParam(schemas.idSchema, "id"),
      validateBody(schemas.purchaseSchema)
    ],
    PurchaseController.replacePurchase
  )
  .patch(
    [
      validateParam(schemas.idSchema, "id"),
      validateBody(schemas.purchaseOptionalSchema)
    ],
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
    [
      validateParam(schemas.idSchema, "id"),
      validateBody(schemas.purchase_productSchema)
    ],
    PurchaseController.newPurchase_Product
  );

module.exports = router;
