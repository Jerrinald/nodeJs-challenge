const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");

module.exports = (req, res, next) => {
  const [type, token] = req.headers.authorization.split(" ");
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (req.method === 'POST') {
        req.body.currentUserId = user.id;
    }
  } catch (err) {
    return next(new UnauthorizedError());
  }
  next();
};
