const mongoose = require("mongoose");
const { v4 } = require("uuid");

const productModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
  },
  old_price: {
    type: Number,
    required: true,
  },
  pizza_products: [
    {
      id: { type: String, default: v4() },
      pizzaId: String,
      productTitle: String,
      productPrice: Number,
      image: String,
      pizzaSize: String,
      category: {
        type: String,
        default: "pizza",
      },
    },
  ],
});

const Products = mongoose.model("Product", productModel);

module.exports = Products;
