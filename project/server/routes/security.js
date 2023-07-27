const { Router } = require("express");
const MarchandService = require("../services/marchand");

const router = Router();

const SecurityController = require("../controllers/security")(
  new MarchandService()
);
const MarchandController = require("../controllers/generic")(new MarchandService());

router.post("/login", SecurityController.login);
router.post("/register", MarchandController.create);

module.exports = router;
