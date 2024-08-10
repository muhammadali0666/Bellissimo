const {Router} = require("express")
const requireAdmin = require("../middleware/tokenChecker")
const { addKombo, getAllKombos, getOneKombo } = require("../controller/kombo_ctr")

const komboRouter = Router()

komboRouter.post("/add_kombo", requireAdmin, addKombo)
komboRouter.get("/get_kombos", getAllKombos)
komboRouter.get("/get_one_kombo/:id", getOneKombo)

module.exports = komboRouter