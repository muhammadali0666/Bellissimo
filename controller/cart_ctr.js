const BaseError = require("../errors/base_error");
const { Cart, Products } = require("../model");

const cart = async (req, res, next) => {
  const { productId, quantity, pizza_products, kombo_products } = req.body;
  const userId = acceptVariable.id;
  // TODO: Get the logged-in user's ID
  try {
    let cart = await Cart.findOne({ userId });

    const doubleFounder = cart?.products.find((c) => c.productId === productId);

    if (doubleFounder) {
      throw BaseError.BadRequest(
        "Click the Add to Cart button to increase the number of products previously added."
      );
    }

    const foundedProduct = await Products.findById(productId);

    if (!foundedProduct) {
      throw BaseError.BadRequest("Product is not defind");
    }

    if (!cart) {
      // Create a new cart for the user
      cart = new Cart({ userId, products: [] });
    }

    // Check if the product already exists in the cart
    const itemIndex = cart.products.findIndex((p) => p.productId === productId);

    if (itemIndex > -1) {
      // Product exists, update the quantity
      cart.products[itemIndex].quantity = quantity;
    } else {
      // Product doesn't exist, add it to the cart
      cart.products.push({
        productId: productId,
        quantity,
        title: foundedProduct.title,
        new_price: foundedProduct.new_price,
        old_price: foundedProduct.old_price,
        image: foundedProduct.image,
        category: foundedProduct.category,
        pizza_products:
          foundedProduct.category === "pizza" ? [...pizza_products] : [],
        kombo_products:
          foundedProduct.category === "kombo" ? [...kombo_products] : [],
      });
    }

    await cart.save();
    return res.json({
      message: "product added",
    });
  } catch (error) {
    next(error);
  }
};

const getCarts = async (req, res, next) => {
  try {
    const getAllCarts = await Cart.find();
    return res.status(200).json(getAllCarts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  cart,
  getCarts
};
