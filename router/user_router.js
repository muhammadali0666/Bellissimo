const { Router } = require("express");
const { register, login, verifyCode } = require("../controller/user_ctr");

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/verify_code", verifyCode);

module.exports = userRouter;
