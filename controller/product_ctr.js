const { InternalServerError } = require("../utils/error");
const { Products } = require("../model");

const getAllProducts = async (_, res, next) => {
  try {
    const products = await Products.find();
    return res.json(products);
  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { title, description, image, category, new_price, old_price } =
      req.body;

    await Products.create({
      title,
      description,
      image,
      category,
      new_price,
      old_price,
    });

    return res.json({
      message: "Product added",
    });
  } catch (error) {
    return next(new InternalServerError(500, error.message));
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Products.findByIdAndDelete({ _id: id });
    res.json({
      message: "Successfully deleted",
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

    res.json(foundedProduct);
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
