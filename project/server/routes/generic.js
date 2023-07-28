const { Router } = require("express");

module.exports = function (Controller, options = {}) {
  const router = new Router();

  router.get("/", Controller.getAll);
  router.post("/", Controller.create);

  router.get("/:id", Controller.getOne);
  router.put("/:id", Controller.replace);
  router.patch("/:id", Controller.update);
  router.delete("/:id", Controller.delete);

  // Add a new route to fetch transactions by merchantId if the method exists
  if (typeof Controller.getAllByMerchantId === 'function') {
    router.get("/marchand/:marchandId", Controller.getAllByMerchantId);
  }

  return router;
};
