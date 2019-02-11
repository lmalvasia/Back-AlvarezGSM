const router = require("express-promise-router")();
const ProviderController = require("../../controllers/providers");
const { validateParam, schemas } = require("../../helpers/routeHelpers");

router
  .route("/")
  .get(ProviderController.index)
  .post(ProviderController.newProvider);

router
  .route("/:id")
  .get(validateParam(schemas.idSchema, "id"), ProviderController.getProvider)
  .put(
    validateParam(schemas.idSchema, "id"),
    ProviderController.replaceProvider
  )
  .patch(
    validateParam(schemas.idSchema, "id"),
    ProviderController.updateProvider
  )
  .delete(
    validateParam(schemas.idSchema, "id"),
    ProviderController.deleteProvider
  );

module.exports = router;
