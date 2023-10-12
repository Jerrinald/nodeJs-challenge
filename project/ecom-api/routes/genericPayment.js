const { Router } = require("express");

module.exports = function (Controller, options = {}) {
    const router = new Router();


    if (router.post("/", Controller.testPay)) {
        console.log("Envoie le paiement à prendre en compte");
        // redirige vers une page de confirmation de paiement

    }

    router.get("/", Controller.testPay);
    return router;
};
