const { Router } = require("express");
const UserService = require("../services/user");

const router = Router();

const SecurityController = require("../controllers/security")(
  new UserService()
);
const UserController = require("../controllers/generic")(new UserService());

router.post("/login", SecurityController.login);
router.post("/register", UserController.create);
router.get("/activate-account/:activationToken", SecurityController.activateaccount);

module.exports = router;
