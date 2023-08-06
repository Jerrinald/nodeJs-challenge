const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");

module.exports = function SecurityController(MarchandService) {
  return {
    login: async (req, res, next) => {
      try {
        const { email, password } = req.body;
        console.log(email, password);
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
  };
};
