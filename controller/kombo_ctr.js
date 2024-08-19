const { Kombo } = require("../model");

const addKombo = async (req, res, next) => {
  try {
    const {
      image,
      title,
      description,
      old_price,
      new_price,
      category,
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
      snackIdes,
      drinkIdes,
      pizzaIdes,
      bellisterIdes,
      dessertIdes,
    } = req.body;

    const kombo = await Kombo.create({
      image: image,
      title: title,
      description: description,
      old_price: old_price,
      new_price: new_price,
      category: category,
      snack: snack,
      drink: drink,
      pizza: pizza,
      bellister: bellister,
      dessert: dessert,
      snackCount: snackCount,
      drinkCount: drinkCount,
      pizzaCount: pizzaCount,
      bellisterCount: bellisterCount,
      dessertCount: dessertCount,
      snackIdes: snackIdes ? [...snackIdes] : [],
      drinkIdes: drinkIdes ? [...drinkIdes] : [],
      pizzaIdes: pizzaIdes ? [...pizzaIdes] : [],
      bellisterIdes: bellisterIdes ? [...bellisterIdes] : [],
      dessertIdes: dessertIdes ? [...dessertIdes] : [],
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
      snackIdes,
      drinkIdes,
      pizzaIdes,
      bellisterIdes,
      dessertIdes,
    } = req.body;
    await Kombo.findByIdAndUpdate(id, {
      image: image,
      title: title,
      description: description,
      old_price: old_price,
      new_price: new_price,
      snack: snack,
      drink: drink,
      pizza: pizza,
      bellister: bellister,
      dessert: dessert,
      snackCount: snackCount,
      drinkCount: drinkCount,
      pizzaCount: pizzaCount,
      bellisterCount: bellisterCount,
      dessertCount: dessertCount,
      snackIdes: snackIdes ? [...snackIdes] : [],
      drinkIdes: drinkIdes ? [...drinkIdes] : [],
      pizzaIdes: pizzaIdes ? [...pizzaIdes] : [],
      bellisterIdes: bellisterIdes ? [...bellisterIdes] : [],
      dessertIdes: dessertIdes ? [...dessertIdes] : [],
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
  updateKombo,
  deleteKombo,
};
