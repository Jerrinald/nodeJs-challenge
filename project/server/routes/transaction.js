const genericRouter = require("./generic");
const genericController = require("../controllers/transaction_security");
const TransactionService = require("../services/transaction");

module.exports = new genericRouter(new genericController(new TransactionService()));