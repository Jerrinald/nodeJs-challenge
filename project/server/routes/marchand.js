const genericRouter = require("./generic");
const genericController = require("../controllers/generic");
const MarchandService = require("../services/marchand");

module.exports = new genericRouter(new genericController(new MarchandService()));
