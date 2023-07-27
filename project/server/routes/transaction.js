const genericRouter = require("./generic");
const genericController = require("../controllers/generic");
const TransactionService = require("../services/transaction");

module.exports = new genericRouter(new genericController(new TransactionService()));