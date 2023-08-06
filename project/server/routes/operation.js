const genericRouter = require("./generic");
const genericController = require("../controllers/generic");
const OperationService = require("../services/operation");

module.exports = new genericRouter(new genericController(new OperationService()));
