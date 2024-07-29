const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const path = require("path");
const multer = require("multer");
const connectDb = require("./db/config");
const productRouter = require("./router/product_router");
const userRouter = require("./router/user_router");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
connectDb();

/////////// router
app.use(productRouter);
app.use(userRouter);

///////////////// image storage engine

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `bellissimo-production.up.railway.app/images/${req.file.filename}`,
  });
});

app.use(errorMiddleware)

app.get("/", (req, res) => {
  res.json({
    message: "success"
  })
})

app.listen(PORT, () => {
  console.log(`server is running on the http://localhost:${PORT}`);
});
