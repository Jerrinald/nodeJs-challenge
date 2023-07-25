const genericRouter = require("./genericPayment");
const genericController = require("../controllers/payment");

module.exports = new genericRouter(new genericController());