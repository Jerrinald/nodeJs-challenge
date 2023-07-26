const { Router } = require("express");

module.exports = function (Controller, options = {}) {
    const router = new Router();

    // Route pour effectuer une transaction (POST)
    router.post("/", Controller.testPay);

    // Autre exemple de route (GET)
    router.get("/", (req, res) => {
        console.log("Redirige vers une page de confirmation de paiement");
        // Votre code de redirection ou de traitement ici
        res.send("Page de confirmation de paiement");
    });

    return router;
};
