const {Router} = require("express")
const requireAdmin = require("../middleware/tokenChecker")
const { addKombo, updateKombo, deleteKombo } = require("../controller/kombo_ctr")

const komboRouter = Router()

komboRouter.post("/add_kombo", requireAdmin, addKombo)
komboRouter.put("/update_kombo/:id", requireAdmin, updateKombo)
komboRouter.delete("/delete_kombo/:id", requireAdmin, deleteKombo)

module.exports = komboRouter