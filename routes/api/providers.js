const router = require("express-promise-router")();
const ProviderController = require("../../controllers/providers");
const {
  validateParam,
  validateBody,
  schemas
} = require("../../helpers/routeHelpers");

router
  .route("/")
  .get(ProviderController.index)
  .post(validateBody(schemas.providerSchema), ProviderController.newProvider);

router
  .route("/:id")
  .get(validateParam(schemas.idSchema, "id"), ProviderController.getProvider)
  .put(
    [
      validateParam(schemas.idSchema, "id"),
      validateBody(schemas.providerSchema)
    ],
    ProviderController.replaceProvider
  )
  .patch(
    [
      validateParam(schemas.idSchema, "id"),
      validateBody(schemas.providerOptionalSchema)
    ],
    ProviderController.updateProvider
  )
  .delete(
    validateParam(schemas.idSchema, "id"),
    ProviderController.deleteProvider
  );

module.exports = router;
