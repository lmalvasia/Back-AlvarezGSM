const router = require("express-promise-router")();
const CustomerController = require("../../controllers/customers");
const {
  validateParam,
  validateBody,
  schemas
} = require("../../helpers/routeHelpers");

const checkAuth = require("../../controllers/check-auth");

router
  .route("/")
  .get(checkAuth, CustomerController.index)
  .post(
    checkAuth,
    validateBody(schemas.customerSchema),
    CustomerController.newCustomer
  );

router
  .route("/:id")
  .get(
    checkAuth,
    validateParam(schemas.idSchema, "id"),
    CustomerController.getCustomer
  )
  .put(
    checkAuth,
    [
      validateParam(schemas.idSchema, "id"),
      validateBody(schemas.customerSchema)
    ],
    CustomerController.replaceCustomer
  )
  .patch(
    checkAuth,
    [
      validateParam(schemas.idSchema, "id"),
      validateBody(schemas.customerOptionalSchema)
    ],
    CustomerController.updateCustomer
  )
  .delete(
    checkAuth,
    validateParam(schemas.idSchema, "id"),
    CustomerController.deleteCustomer
  );

module.exports = router;
