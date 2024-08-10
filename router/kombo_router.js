const {Router} = require("express")
const requireAdmin = require("../middleware/tokenChecker")
const { addKombo, getAllKombos } = require("../controller/kombo_ctr")

const komboRouter = Router()

komboRouter.post("/add_kombo", requireAdmin, addKombo)
komboRouter.get("/get_kombos", getAllKombos)

module.exports = komboRouter