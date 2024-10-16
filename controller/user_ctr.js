const { User } = require("../model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const BaseError = require("../errors/base_error");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      throw BaseError.BadRequest("user already exists");
    }
    ///////////////////////////// nodemailer
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "muhammadalishuhratjonov50@gmail.com",
        pass: "vkji hkwm phxx hwir",
      },
    });

    let randomStr = "";
    let randomNumberOne = Math.floor(Math.random() * 10);
    let randomNumberTwo = Math.floor(Math.random() * 10);
    let randomNumberThree = Math.floor(Math.random() * 10);
    let randomNumberFour = Math.floor(Math.random() * 10);
    let randomNumberFiveth = Math.floor(Math.random() * 10);
    let randomNumberSixth = Math.floor(Math.random() * 10);

    randomStr += randomNumberOne;
    randomStr += randomNumberTwo;
    randomStr += randomNumberThree;
    randomStr += randomNumberFour;
    randomStr += randomNumberFiveth;
    randomStr += randomNumberSixth;

    let mailOptions = {
      from: "muhammadalishuhratjonov50@gmail.com",
      to: `${email}`,
      subject: "ZarStore verify code ✋",
      html: `<b> your verification code is <span style="color: blue; font-size: 25px;">${randomStr}</span></b>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    /////////////////////////////

    if (!password.trim()) {
      throw BaseError.BadRequest("Password invalid");
    }

    let hash = await bcrypt.hash(password, 12);

    await User.create({ username, email, password: hash, verify: randomStr });

    return res.status(201).json({
      status: 201,
      message: "User has been registered please check your gmail inbox",
      email,
    });
  } catch (error) {
    next(error);
  }
};

const verifyCode = async (req, res, next) => {
  try {
    const { verify, email } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw BaseError.BadRequest("User not found");
    }
    if (user.verify !== verify) {
      throw BaseError.BadRequest("verify code mistake or you must be refresh and try again");
    }

    if (user.verify === verify) {
      await User.findByIdAndUpdate(user._id, { verified: true });
      let token = await jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.SEKRET_KEY,
        {
          expiresIn: "7d",
        }
      );
      return res.status(201).send({
        status: 201,
        message: "Success",
        result: token,
      });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email: email });
    
    if (!user) {
      throw BaseError.BadRequest("Email not found");
    }
    let founEmail = user.email === email;

    if (!founEmail) {
      throw BaseError.BadRequest("You have not registered");
    }

    let check = await bcrypt.compare(password, user.password);

    if (check && user.verified === true) {
      let token = await jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.SEKRET_KEY,
        {
          expiresIn: "7d",
        }
      );
      return res.status(201).json({
        status: 201,
        message: "Success",
        result: token,
      });
    } else {
      throw BaseError.BadRequest(
        "Password wrong or you are not veriy your code"
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  verifyCode,
  login,
};
