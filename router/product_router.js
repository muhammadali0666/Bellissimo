const { Router } = require("express");
const {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getOneProduct,
  createPizzaProduct,
  deletePizzaProduct,
  getPizzaProducts,
  updatePizzaProduct,
  addKombo,
} = require("../controller/product_ctr");
const requireAdmin = require("../middleware/tokenChecker");

const productRouter = Router();

productRouter.get("/get_all_products", getAllProducts);
productRouter.get("/get_one_product/:id", getOneProduct);
productRouter.post("/add_product", requireAdmin, createProduct);
productRouter.delete("/delete_product/:id", requireAdmin, deleteProduct);
productRouter.put("/update_product/:id", requireAdmin, updateProduct);
///////////////// pizzaProduct
productRouter.get("/get_pizza_products/:id", getPizzaProducts)
productRouter.post("/add_pizza_product", requireAdmin, createPizzaProduct);
productRouter.put("/update_pizza_product", requireAdmin, updatePizzaProduct)
productRouter.delete("/delete_pizza_product", requireAdmin, deletePizzaProduct)
///////////////// kombo
productRouter.post("/add_kombo", requireAdmin, addKombo)

module.exports = productRouter;
