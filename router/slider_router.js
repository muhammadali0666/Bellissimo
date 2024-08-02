const Router = require("express")
const requireAdmin = require("../middleware/tokenChecker")
const { createSlide, getSlides, updateSlide } = require("../controller/slider-ctr")

const slideRouter = Router()

slideRouter.get("/get_slides", getSlides)
slideRouter.post("/create_slide", requireAdmin, createSlide)
slideRouter.put("/update_slide/:id", requireAdmin, updateSlide)

module.exports = slideRouter