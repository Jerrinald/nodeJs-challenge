const genericRouter = require("./generic");
const genericController = require("../controllers/generic");
const ProductService = require("../services/product");

module.exports = new genericRouter(new genericController(new ProductService()));