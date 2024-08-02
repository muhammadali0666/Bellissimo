const { Slide } = require("../model");

const getSlides = async (_, res, next) => {
  try {
    const slides = await Slide.find();
    return res.status(200).json(slides)
  } catch (error) {
    next(error);
  }
};

const createSlide = async (req, res, next) => {
  try {
    const { image } = req.body;
    await Slide.create({ image });
    return res.status(201).json({
      status: 201,
      message: "created slide",
      result: image,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSlides,
  createSlide,
};
