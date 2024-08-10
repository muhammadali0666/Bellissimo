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

const getOneKombo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundedKombo = await Kombo.findById({ _id: id });
    return res.status(200).json(foundedKombo);
  } catch (error) {
    next(error);
  }
};

const updateKombo = async (req, res, next) => {
  try {
    const { id } = req.params;
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
    await Kombo.findByIdAndUpdate(id, {
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

    const foundedProduct = await Kombo.findById(id);

    res.status(201).json({
      status: 201,
      message: "Successfully updated",
      result: foundedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const deleteKombo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundedProduct = await Kombo.findByIdAndDelete({ _id: id });
    res.status(201).json({
      message: "Successfully deleted",
      status: 201,
      result: foundedProduct,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addKombo,
  getAllKombos,
  getOneKombo,
  updateKombo,
  deleteKombo,
};
