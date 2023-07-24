const genericRouter = require("./generic");
const genericController = require("../controllers/generic");
const OrderService = require("../services/order");

module.exports = new genericRouter(new genericController(new OrderService()));