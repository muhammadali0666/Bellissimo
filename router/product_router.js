const { Router } = require("express");
const { getAllProducts, createProduct } = require("../controller/product_ctr");

const productRouter = Router();

productRouter.get("/get_all_products", getAllProducts);
productRouter.post("/add_product", createProduct)

module.exports = productRouter;
