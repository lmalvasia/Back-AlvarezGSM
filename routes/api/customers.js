const router = require("express-promise-router")();
const CustomerController = require("../../controllers/customers");
const { validateParam, schemas } = require("../../helpers/routeHelpers");

router
  .route("/")
  .get(CustomerController.index)
  .post(CustomerController.newCustomer);

router
  .route("/:id")
  .get(validateParam(schemas.idSchema, "id"), CustomerController.getCustomer)
  .put(
    validateParam(schemas.idSchema, "id"),
    CustomerController.replaceCustomer
  )
  .patch(
    validateParam(schemas.idSchema, "id"),
    CustomerController.updateCustomer
  )
  .delete(
    validateParam(schemas.idSchema, "id"),
    CustomerController.deleteCustomer
  );

module.exports = router;
