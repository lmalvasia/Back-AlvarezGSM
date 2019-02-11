const router = require("express-promise-router")();
const CustomerController = require("../../controllers/customers");
const {
  validateParam,
  validateBody,
  schemas
} = require("../../helpers/routeHelpers");

router
  .route("/")
  .get(CustomerController.index)
  .post(validateBody(schemas.customerSchema), CustomerController.newCustomer);

router
  .route("/:id")
  .get(validateParam(schemas.idSchema, "id"), CustomerController.getCustomer)
  .put(
    [
      validateParam(schemas.idSchema, "id"),
      validateBody(schemas.customerSchema)
    ],
    CustomerController.replaceCustomer
  )
  .patch(
    [
      validateParam(schemas.idSchema, "id"),
      validateBody(schemas.customerOptionalSchema)
    ],
    CustomerController.updateCustomer
  )
  .delete(
    validateParam(schemas.idSchema, "id"),
    CustomerController.deleteCustomer
  );

module.exports = router;
