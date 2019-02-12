const router = require("express-promise-router")();
const PurchaseController = require("../../controllers/purchases.js");
const {
  validateParam,
  validateBody,
  schemas
} = require("../../helpers/routeHelpers");
const checkAuth = require("../../controllers/check-auth");

router
  .route("/")
  .get(checkAuth, PurchaseController.index)
  .post(
    checkAuth,
    validateBody(schemas.purchaseSchema),
    PurchaseController.newPurchase
  );

router
  .route("/:id")
  .get(
    checkAuth,
    validateParam(schemas.idSchema, "id"),
    PurchaseController.getPurchase
  )
  .put(
    checkAuth,
    [
      validateParam(schemas.idSchema, "id"),
      validateBody(schemas.purchaseSchema)
    ],
    PurchaseController.replacePurchase
  )
  .patch(
    checkAuth,
    [
      validateParam(schemas.idSchema, "id"),
      validateBody(schemas.purchaseOptionalSchema)
    ],
    PurchaseController.updatePurchase
  )
  .delete(
    checkAuth,
    validateParam(schemas.idSchema, "id"),
    PurchaseController.deletePurchase
  );

router
  .route("/:id/products")
  .get(
    checkAuth,
    validateParam(schemas.idSchema, "id"),
    PurchaseController.getPurchase_Products
  )
  .post(
    checkAuth,
    [
      validateParam(schemas.idSchema, "id"),
      validateBody(schemas.purchase_productSchema)
    ],
    PurchaseController.newPurchase_Product
  );

module.exports = router;
