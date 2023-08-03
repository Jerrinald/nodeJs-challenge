const { Router } = require("express");

module.exports = function (Controller, options = {}) {
  const router = new Router();

  router.get("/", Controller.testPay);
  return router;
};

