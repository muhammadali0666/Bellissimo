const Router = require("express")
const requireAdmin = require("../middleware/tokenChecker")
const { createSlide, getSlides, updateSlide, deleteSlide } = require("../controller/slider-ctr")

const slideRouter = Router()

slideRouter.post("/create_slide", requireAdmin, createSlide)
slideRouter.get("/get_slides", getSlides)
slideRouter.put("/update_slide/:id", requireAdmin, updateSlide)
slideRouter.delete("/delete_slide/:id", requireAdmin, deleteSlide)

module.exports = slideRouter