const {Kombo} = require("../model")

const addKombo = async (req, res, next) => {
  try {
    const {
      komboImage,
      komboTitle,
      komboDescription,
      komboPrice,
      snack,
      drink,
      pizza,
      bellister,
      dessert,
      snackCount,
      drinkCount,
      pizzaCount,
      bellisterCount,
      dessertCount,
    } = req.body;

    await Products
  } catch (error) {
    next(error);
  }
};

const getAllKombos = async (req, res, next) => {
  try {
    const products = await Kombo.find();

    return res.json(products);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  addKombo,
  getAllKombos
}