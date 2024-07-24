const jwt = require("jsonwebtoken");
const { AuthorizationError } = require("../utils/error");

async function requireAuth(req, res, next) {
  try {
    const token = req.headers.token;
    if (!token) {
      return next(new AuthorizationError(403, "A token is required for authentication"))
    }
    try {
      const decoded = jwt.verify(token, process.env.SEKRET_KEY);
      if (!decoded) {
        return next(new AuthorizationError(403, "token not active"))
      }
      acceptVariable = decoded;
    } catch (err) {
      return next(new AuthorizationError(401, "Invalid token and try login or register again"))
    }
    next();
  } catch (err) {
    return;
  }
}

module.exports = requireAuth;
