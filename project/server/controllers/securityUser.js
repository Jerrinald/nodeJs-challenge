const jwt = require("jsonwebtoken");

module.exports = function SecurityController(UserService) {
  return {
    login: async (req, res, next) => {
      try {
        const { email, password } = req.body;
        const user = await UserService.login(email, password);
        const token = jwt.sign(
            {
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
            },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.json({ token, user });
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
