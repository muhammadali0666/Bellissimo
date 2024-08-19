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
  category: {
    type: String,
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
  snackIdes: {
    type: Array,
    default: [],
  },
  drinkCount: {
    type: Number,
    default: 0,
  },
  drinkIdes: {
    type: Array,
    default: [],
  },
  pizzaCount: {
    type: Number,
    default: 0,
  },
  pizzaIdes: {
    type: Array,
    default: [],
  },
  bellisterCount: {
    type: Number,
    default: 0,
  },
  bellisterIdes: {
    type: Array,
    default: [],
  },
  dessertCount: {
    type: Number,
    default: 0,
  },
  dessertIdes: {
    type: Array,
    default: [],
  },
});

const Kombo = mongoose.model("Kombo", komboModel);

module.exports = Kombo;
