const mongoose = require("mongoose");
const { v4 } = require("uuid");

const komboModel = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  new_price: {
    type: Number,
    default: 0
  },
  snack: Boolean,
  drink: Boolean,
  pizza: Boolean,
  bellister: Boolean,
  dessert: Boolean,
  snackCount: {
    type: Number,
    default: 0,
  },
  drinkCount: {
    type: Number,
    default: 0,
  },
  pizzaCount: {
    type: Number,
    default: 0,
  },
  bellisterCount: {
    type: Number,
    default: 0,
  },
  dessertCount: {
    type: Number,
    default: 0,
  },
});

const Kombo = mongoose.model("Kombo", komboModel);

module.exports = Kombo;
