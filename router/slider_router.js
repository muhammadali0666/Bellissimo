const Router = require("express")
const requireAdmin = require("../middleware/tokenChecker")
const { createSlide, getSlides } = require("../controller/slider-ctr")

const slideRouter = Router()

slideRouter.post("/create_slide", requireAdmin, createSlide)
slideRouter.get("/get_slides", getSlides)

module.exports = slideRouter