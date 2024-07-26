const jwt = require("jsonwebtoken");
const BaseError = require("../errors/base_error");

async function requireAuth(req, res, next) {
  try {
    const token = req.headers.token;
    if (!token) {
      throw BaseError.BadRequest("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, process.env.SEKRET_KEY);
      if (!decoded) {
        throw BaseError.BadRequest("token not active");
      }
      acceptVariable = decoded;
    } catch (err) {
      throw BaseError.BadRequest(
        "Invalid token and try login or register again"
      );
    }
    next();
  } catch (err) {
    next(err)
  }
}

module.exports = requireAuth;
