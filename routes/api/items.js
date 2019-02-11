const router = require("express-promise-router")();
const ItemController = require("../../controllers/items");
const { validateParam, schemas } = require("../../helpers/routeHelpers");

router
  .route("/")
  .get(ItemController.index)
  .post(ItemController.newItem);

router
  .route("/:id")
  .get(validateParam(schemas.idSchema, "id"), ItemController.getItem)
  .put(validateParam(schemas.idSchema, "id"), ItemController.replaceItem)
  .patch(validateParam(schemas.idSchema, "id"), ItemController.updateItem)
  .delete(ItemController.deleteItem);

module.exports = router;
