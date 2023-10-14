const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");

module.exports = (req, res, next) => {
  if (req.originalUrl === '/marchands/credential') {
    if (req.method === 'POST') {
      return next();
    }
  }
  if (!req.headers.authorization) {
    return next(new UnauthorizedError());
  }
  const [type, token] = req.headers.authorization.split(" ");
  if (type !== "Bearer") {
    return next(new UnauthorizedError());
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } catch (err) {
    return next(new UnauthorizedError());
  }
  next();
};
