const { Router } = require("express");
const { cart, getCarts, deleteCart } = require("../controller/cart_ctr");
const requireAdmin = require("../middleware/tokenChecker");

const cartRouter = Router();

cartRouter.post("/add_cart", requireAdmin, cart);
cartRouter.get("/get_cart", getCarts);
cartRouter.delete("/delete_cart/:id", requireAdmin, deleteCart)

module.exports = cartRouter;