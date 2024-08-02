const Router = require("express")
const requireAdmin = require("../middleware/tokenChecker")
const { createSlide } = require("../controller/slider-ctr")

const slideRouter = Router()

slideRouter.post("/create_slide", requireAdmin, createSlide)

module.exports = slideRouter