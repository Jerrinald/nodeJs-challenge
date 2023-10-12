const genericRouter = require("./generic");
const genericController = require("../controllers/generic");
const CredentialService = require("../services/credential");

module.exports = new genericRouter(new genericController(new CredentialService()));