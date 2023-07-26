const { Router } = require("express");

module.exports = function (Controller, options = {}) {
  const router = new Router();

  router.post("/", Controller.testPay);

  return router;
};