const { Router } = require("express");
const { getAllProducts, createProduct, deleteProduct, updateProduct, getOneProduct, createPizzaProduct } = require("../controller/product_ctr");
const requireAdmin = require("../middleware/tokenChecker");

const productRouter = Router();

productRouter.get("/get_all_products", getAllProducts);
productRouter.get("/get_one_product/:id", getOneProduct)
productRouter.post("/add_product", requireAdmin, createProduct)
productRouter.post("/add_pizza_product", requireAdmin, createPizzaProduct)
productRouter.delete("/delete_product/:id", requireAdmin, deleteProduct)
productRouter.put("/update_product/:id", requireAdmin, updateProduct)

module.exports = productRouter;
