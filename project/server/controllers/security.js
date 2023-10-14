const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");

module.exports = function SecurityController(MarchandService) {
  return {
    login: async (req, res, next) => {
      try {
        const { email, password } = req.body;
        const marchand = await MarchandService.login(email, password);
        if (marchand) {
          console.log(marchand);
          if (!marchand.active) {
            throw new UnauthorizedError("Account not activated.");
          }
        }
        const token = jwt.sign(
          { id: marchand.id, firstname: marchand.firstname, lastname: marchand.lastname, fullName: marchand.lastname + " " + marchand.firstname },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.json({ token, marchand });
      } catch (err) {
        next(err);
      }
    },
    logout: async (req, res, next) => {
      try {
        // Vous pouvez effectuer des opérations de déconnexion ici, par exemple, invalider le token JWT du côté serveur si vous l'utilisez
        // Dans cet exemple, nous allons simplement effacer le token côté client en configurant une expiration passée pour le cookie contenant le token JWT.


        // Répondre avec une réponse de succès pour indiquer que la déconnexion s'est bien passée
        res.status(200).json({ message: "Déconnexion réussie" });
      } catch (err) {
        next(err);
      }
    },
  };
};
