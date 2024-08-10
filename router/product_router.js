const { Router } = require("express");
const {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  // pizza product
  createPizzaProduct,
  getPizzaProducts,
  updatePizzaProduct,
  deletePizzaProduct,
} = require("../controller/product_ctr");
const requireAdmin = require("../middleware/tokenChecker");

const productRouter = Router();

productRouter.post("/add_product", requireAdmin, createProduct);
productRouter.get("/get_all_products", getAllProducts);
productRouter.get("/get_one_product/:id", getOneProduct);
productRouter.put("/update_product/:id", requireAdmin, updateProduct);
productRouter.delete("/delete_product/:id", requireAdmin, deleteProduct);
///////////////// pizzaProduct
productRouter.post("/add_pizza_product", requireAdmin, createPizzaProduct);
productRouter.get("/get_pizza_products/:id", getPizzaProducts)
productRouter.put("/update_pizza_product", requireAdmin, updatePizzaProduct)
productRouter.delete("/delete_pizza_product", requireAdmin, deletePizzaProduct)

module.exports = productRouter;
