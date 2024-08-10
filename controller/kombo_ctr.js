const { Kombo } = require("../model");

const addKombo = async (req, res, next) => {
  try {
    const {
      image,
      title,
      description,
      old_price,
      new_price,
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

    const kombo = await Kombo.create({
      image,
      title,
      description,
      old_price,
      new_price,
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
    });

    return res.status(201).json({
      status: 201,
      message: "Kombo has been added",
      result: kombo,
    });
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
  getAllKombos,
};
