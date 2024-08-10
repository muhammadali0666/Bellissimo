const {Router} = require("express")
const requireAdmin = require("../middleware/tokenChecker")
const { addKombo, getAllKombos, getOneKombo, updateKombo, deleteKombo } = require("../controller/kombo_ctr")

const komboRouter = Router()

komboRouter.post("/add_kombo", requireAdmin, addKombo)
komboRouter.get("/get_kombos", getAllKombos)
komboRouter.get("/get_one_kombo/:id", getOneKombo)
komboRouter.put("/update_kombo/:id", requireAdmin, updateKombo)
komboRouter.delete("/delete_kombo/:id", requireAdmin, deleteKombo)

module.exports = komboRouter