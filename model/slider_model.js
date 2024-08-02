const mongoose = require("mongoose");

const Slider = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

const Slide = mongoose.model("slider", Slider);

module.exports = Slide;
