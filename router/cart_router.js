const { Router } = require("express");
const { cart } = require("../controller/cart_ctr");
const requireAdmin = require("../middleware/tokenChecker");

const cartRouter = Router();

cartRouter.post("/add_cart", requireAdmin, cart);

module.exports = cartRouter;