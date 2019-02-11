const router = require("express-promise-router")();
const ItemController = require("../../controllers/items");
const {
  validateParam,
  validateBody,
  schemas
} = require("../../helpers/routeHelpers");

router
  .route("/")
  .get(ItemController.index)
  .post(validateBody(schemas.itemSchema), ItemController.newItem);

router
  .route("/:id")
  .get(validateParam(schemas.idSchema, "id"), ItemController.getItem)
  .put(
    [validateParam(schemas.idSchema, "id"), validateBody(schemas.itemSchema)],
    ItemController.replaceItem
  )
  .patch(
    [
      validateParam(schemas.idSchema, "id"),
      validateBody(schemas.itemOptionalSchema)
    ],
    ItemController.updateItem
  )
  .delete(validateParam(schemas.idSchema, "id"), ItemController.deleteItem);

module.exports = router;
