const router = require("express-promise-router")();
const ProviderController = require("../../controllers/providers");
const {
  validateParam,
  validateBody,
  schemas
} = require("../../helpers/routeHelpers");
const checkAuth = require("../../controllers/check-auth");

router
  .route("/")
  .get(checkAuth, ProviderController.index)
  .post(
    checkAuth,
    validateBody(schemas.providerSchema),
    ProviderController.newProvider
  );

router
  .route("/:id")
  .get(
    checkAuth,
    validateParam(schemas.idSchema, "id"),
    ProviderController.getProvider
  )
  .put(
    checkAuth,
    [
      validateParam(schemas.idSchema, "id"),
      validateBody(schemas.providerSchema)
    ],
    ProviderController.replaceProvider
  )
  .patch(
    checkAuth,
    [
      validateParam(schemas.idSchema, "id"),
      validateBody(schemas.providerOptionalSchema)
    ],
    ProviderController.updateProvider
  )
  .delete(
    checkAuth,
    validateParam(schemas.idSchema, "id"),
    ProviderController.deleteProvider
  );

module.exports = router;
