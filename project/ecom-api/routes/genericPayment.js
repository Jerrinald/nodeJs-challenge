const { Router } = require("express");

module.exports = function (Controller, options = {}) {
    const router = new Router();


    if (router.get("/", Controller.testPay)) {
        console.log("Envoie le paiement à prendre en compte");
        // redirige vers une page de confirmation de paiement

    }

    router.post("/", Controller.create);
    return router;
};
