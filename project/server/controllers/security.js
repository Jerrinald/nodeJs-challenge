const jwt = require("jsonwebtoken");

module.exports = function SecurityController(UserService) {
  return {
    login: async (req, res, next) => {
      try {
        const { email, password } = req.body;
        const user = await UserService.login(email, password);
        const token = jwt.sign(
          { id: user.id, firstname: user.firstname, lastname: user.lastname, fullName: user.lastname + " " + user.firstname },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.json({ token });
      } catch (err) {
        next(err);
      }
    },
    activateaccount: async (req, res, next) => {
      const activationToken = req.params.activationToken;

      try {
        // Recherchez l'utilisateur dans la base de données en utilisant le jeton d'activation
        const user = await UserService.findOne({activationToken : activationToken});

        if (!user) {
          // Si l'utilisateur n'est pas trouvé, redirigez vers l'URL côté client avec un message d'erreur en tant que paramètre
          res.cookie('activationMessage', "Le lien d'activation est invalide ou expiré.");
          return res.redirect('http://localhost:5173/account-activated');
        }

        // Mettez à jour le compte de l'utilisateur pour le marquer comme activé
        user.isActivated = true;
        user.activationToken = null;
        await user.save();

        // Redirigez vers l'URL côté client avec un message de succès en tant que paramètre
        res.cookie('activationMessage', 'Votre compte a été activé avec succès!');
        return res.redirect('http://localhost:5173/account-activated');
      } catch (error) {
        // En cas d'erreur, redirigez vers l'URL côté client avec un message d'erreur en tant que paramètre
        res.cookie('activationMessage', "Une erreur s'est produite lors de l'activation de votre compte.");
        return res.redirect('http://localhost:5173/account-activated');
      }
    },

  };
};
