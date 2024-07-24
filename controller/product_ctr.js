const { InternalServerError } = require("../utils/error");
const { Products } = require("../model");

const getAllProducts = async (_, res, next) => {
  try {
    const products = await Products.find();
    return res.status(200).json(products);
  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { title, description, image, category, new_price, old_price } =
      req.body;

    const newProduct = await Products.create({
      title,
      description,
      image,
      category,
      new_price,
      old_price,
    });

    return res.status(201).json({
      status: 201,
      message: "Product added",
      result: newProduct,
    });
  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundedProduct = await Products.findByIdAndDelete({ _id: id });
    res.status(201).json({
      message: "Successfully deleted",
      status: 201,
      result: foundedProduct,
    });
  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, image, category, new_price, old_price } =
      req.body;
    await Products.findByIdAndUpdate(id, {
      title,
      description,
      image,
      category,
      new_price,
      old_price,
    });

    const foundedProduct = await Products.findById(id);

    res.status(201).json({
      status: 201,
      message: "Successfully updated",
      result: foundedProduct,
    });
  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
