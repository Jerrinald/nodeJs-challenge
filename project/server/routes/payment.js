const PaymentRouter = require("./genericPayment");
const PaymentController = require("../controllers/payment");
const PaymentService = require("../services/payments");

module.exports = new PaymentRouter(new PaymentController(new PaymentService()));




