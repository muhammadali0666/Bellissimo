const { Router } = require("express");
const { getAllProducts, createProduct, deleteProduct, updateProduct } = require("../controller/product_ctr");

const productRouter = Router();

productRouter.get("/get_all_products", getAllProducts);
productRouter.post("/add_product", createProduct)
productRouter.delete("/delete_product/:id", deleteProduct)
productRouter.put("/update_product/:id", updateProduct)

module.exports = productRouter;
