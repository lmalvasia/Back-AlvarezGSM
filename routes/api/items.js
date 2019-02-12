const router = require("express-promise-router")();
const ItemController = require("../../controllers/items");
const {
  validateParam,
  validateBody,
  schemas
} = require("../../helpers/routeHelpers");
const checkAuth = require("../../controllers/check-auth");

router
  .route("/")
  .get(checkAuth, ItemController.index)
  .post(checkAuth, validateBody(schemas.itemSchema), ItemController.newItem);

router
  .route("/:id")
  .get(checkAuth, validateParam(schemas.idSchema, "id"), ItemController.getItem)
  .put(
    checkAuth,
    [validateParam(schemas.idSchema, "id"), validateBody(schemas.itemSchema)],
    ItemController.replaceItem
  )
  .patch(
    checkAuth,
    [
      validateParam(schemas.idSchema, "id"),
      validateBody(schemas.itemOptionalSchema)
    ],
    ItemController.updateItem
  )
  .delete(
    checkAuth,
    validateParam(schemas.idSchema, "id"),
    ItemController.deleteItem
  );

module.exports = router;
