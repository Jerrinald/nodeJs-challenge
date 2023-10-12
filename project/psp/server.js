const express = require("express");
const app = express();

// Route GET "/operations"
app.get("/operations", (req, res) => {
  // Wait for 10 seconds before responding
  setTimeout(() => {
    // Route POST "/operations"
    res.status(200).json({ message: "Opération réussie à la plateforme." });
  }, 10000); // 10 seconds in milliseconds
});

// Start the server on port 3200
app.listen(3000, () => {
  console.log("Serveur en écoute sur le port 3000");
});
