const BaseError = require("../errors/base_error");
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

//////////////////////////// pizza products

const getPizzaProducts = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundedPizza = await Products.findById({ _id: id });

    return res.json(foundedPizza.pizza_products);
  } catch (error) {
    next(error);
  }
};

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

    if (foundedPizza.category !== "pizza") {
      throw BaseError.BadRequest(
        "This api for only pizza, you need select pizza for category field"
      );
    }

    foundedPizza.pizza_products.push(newProduct);

    foundedPizza.save();
    return res.status(201).json({
      status: 201,
      message: "Pizza product added",
      result: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

const updatePizzaProduct = async (req, res, next) => {
  try {
    const {
      pizzaId,
      pizzaProductId,
      productTitle,
      productPrice,
      image,
      pizzaSize,
    } = req.body;

    const foundedPizza = await Products.findById({ _id: pizzaId });

    const foundedPizzaProduct = foundedPizza.pizza_products.find(
      (product) => product.id === pizzaProductId
    );

    if (foundedPizzaProduct) {
      foundedPizzaProduct.productTitle = productTitle
        ? productTitle
        : foundedPizzaProduct.productTitle;
      foundedPizzaProduct.productPrice = productPrice
        ? productPrice
        : foundedPizzaProduct.productPrice;
      foundedPizzaProduct.image = image ? image : foundedPizzaProduct.image;
      foundedPizzaProduct.pizzaSize = pizzaSize
        ? pizzaSize
        : foundedPizzaProduct.pizzaSize;
    }

    await foundedPizza.save();
    return res.status(201).json({
      status: 201,
      message: "Pizza product updated",
    });
  } catch (error) {
    next(error);
  }
};

const deletePizzaProduct = async (req, res, next) => {
  try {
    const { pizzaId, pizzaProductId } = req.body;

    const foundedPizza = await Products.findById({ _id: pizzaId });

    const foundedPizzaProduct = foundedPizza.pizza_products.findIndex(
      (product) => product.id === pizzaProductId
    );

    foundedPizza.pizza_products.splice(foundedPizzaProduct, 1);

    await foundedPizza.save();
    return res.status(201).json({
      status: 201,
      message: "Pizza product deleted",
    });
  } catch (error) {
    next(error);
  }
};

//////////////////////////// pizza products

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  // pizzaProduct
  getPizzaProducts,
  createPizzaProduct,
  updatePizzaProduct,
  deletePizzaProduct,
};
