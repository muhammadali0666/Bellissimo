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
const slideRouter = require("./router/slider_router");
///////////// google drive
// const fs = require('fs');
// const { google }= require('googleapis');
// const apikeys = require("./apikeys.json");

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
app.use(slideRouter)

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

app.use(
  "/images",
  express.static("upload/images")
);

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${PORT}/images/${req.file.filename}`,
  });
});

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.json({
    message: "success",
  });
});

///////// google drive

// const SCOPE = ["https://googleapis.com/auth/drive"];

// async function authorize(){
//   const jwtClient = new google.auth.JWT(
//       apikeys.client_email,
//       null,
//       apikeys.private_key,
//       SCOPE
//   );
//   await jwtClient.authorize();
//   return jwtClient;
// }

// async function uploadFile(authClient){
//   return new Promise((resolve,rejected)=>{
//       const drive = google.drive({version:'v2',auth:authClient}); 
//       var fileMetaData = {
//           name:'mydrivetext.txt',    
//           parents:['1bZoTbqCew34MGr1DfgczcA40ECM_QhKg'] // A folder ID to which file will get uploaded
//       }
//       drive.files.create({
//           resource:fileMetaData,
//           media:{
//               body: fs.createReadStream('test.txt'), // files that will get uploaded
//               mimeType:'text/plain'
//           },
//           fields:'id'
//       },function(error,file){
//           if(error){
//               return rejected(error)
//           }
//           resolve(file);
//       })
//   });
// }
// authorize().then(uploadFile).catch("error");

app.listen(PORT, () => {
  console.log(`server is running`);
});
