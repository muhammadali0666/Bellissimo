const { Router } = require("express");
const { getAllProducts, createProduct, deleteProduct, updateProduct, getOneProduct } = require("../controller/product_ctr");

const productRouter = Router();

productRouter.get("/get_all_products", getAllProducts);
productRouter.get("/get_one_product/:id", getOneProduct)
productRouter.post("/add_product", createProduct)
productRouter.delete("/delete_product/:id", deleteProduct)
productRouter.put("/update_product/:id", updateProduct)

module.exports = productRouter;
