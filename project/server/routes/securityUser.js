const { Router } = require("express");
const UserService = require("../services/user");

const router = Router();

const SecurityController = require("../controllers/securityUser")(
  new UserService()
);
const UserController = require("../controllers/generic")(new UserService());

router.post("/loginUser", SecurityController.login);
router.post("/logoutUser", SecurityController.logout);
router.post("/registerUser", UserController.create);

module.exports = router;
