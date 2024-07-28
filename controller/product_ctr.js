const { Products } = require("../model");

const getAllProducts = async (_, res, next) => {
  try {
    const products = await Products.find();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getOneProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Products.findOne({ _id: id });
    return res.status(200).json(product);
  } catch (error) {
    next(error);
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
    next(error);
  }
};

//////////////////////////// pizza products

const createPizzaProduct = async (req, res, next) => {
  try {
    const { pizzaId, productTitle, productPrice, image, pizzaSize } = req.body;

    const foundedPizza = await Products.findById({ _id: pizzaId });

    const newProduct = {
      productTitle,
      productPrice,
      image,
      pizzaSize,
    };

    foundedPizza.pizza_products.push(newProduct);

    foundedPizza.save();
    return res.status(201).json({
      status: 201,
      message: "Pizza product added",
      result: newProduct,
    });
    // const newProduct = await Products.create({
    //   productTitle,
    //   productPrice,
    //   image,
    //   pizzaSize,
    // });

    // return res.status(201).json({
    //   status: 201,
    //   message: "Product added",
    //   result: newProduct,
    // });
  } catch (error) {
    next(error);
  }
};

//////////////////////////// pizza products

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
    next(error);
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
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  createPizzaProduct,
  deleteProduct,
  updateProduct,
};
