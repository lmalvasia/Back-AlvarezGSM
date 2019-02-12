const router = require("express-promise-router")();
const UserController = require("../../controllers/users");
const {
  validateParam,
  validateBody,
  schemas
} = require("../../helpers/routeHelpers");
const checkAuth = require("../../controllers/check-auth");

router
  .route("/")
  .get(checkAuth, UserController.index)
  .post(UserController.newUser);

router.route("/:id").delete(UserController.deleteUser);

router.route("/login").post(UserController.login);

module.exports = router;
