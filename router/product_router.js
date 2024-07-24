const { Router } = require("express");
const { getAllProducts, createProduct, deleteProduct, updateProduct, getOneProduct } = require("../controller/product_ctr");
const requireAuth = require("../middleware/tokenChecker");

const productRouter = Router();

productRouter.get("/get_all_products", getAllProducts);
productRouter.get("/get_one_product/:id", getOneProduct)
productRouter.post("/add_product", requireAuth, createProduct)
productRouter.delete("/delete_product/:id", requireAuth, deleteProduct)
productRouter.put("/update_product/:id", requireAuth, updateProduct)

module.exports = productRouter;
