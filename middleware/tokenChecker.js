const jwt = require("jsonwebtoken");
const BaseError = require("../errors/base_error");

async function requireAdmin(req, res, next) {
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
      if(acceptVariable.role !== "admin"){
        throw BaseError.BadRequest("You are not admin")
      }
    } catch (err) {
      throw BaseError.BadRequest(
        "Invalid token you are not admin and try login or register again"
      );
    }
    next();
  } catch (err) {
    next(err)
  }
}

module.exports = requireAdmin;
