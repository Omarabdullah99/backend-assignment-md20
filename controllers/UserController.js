const UserModel = require("../models/UserModel");
const { EncodeToken } = require("../utility/TokenHelper");
const bcrypt = require("bcrypt");

const testUser = async (req, res) => {
  res.status(200).json({ message: "success" });
};

const CreateUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    let result = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({
      email: email,
    });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    // পাসওয়ার্ড মেলানো
    const isPasswordValid = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid password" });

    // User Token Create
    let token = EncodeToken(oldUser.email, oldUser._id);

    // Cookies Option
    let cookieOption = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: false,
    };

    // Set Cookies With Response
    res.cookie("token", token, cookieOption);

    return res
      .status(200)
      .json({ status: "success", data: oldUser, token: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const Logout = async (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
  
      return res.status(200).json({ status: "success", message: "Logged out successfully" });
    } catch (error) {
      return res.status(500).json({ status: "fail", message: "Logout failed" });
    }
  };

module.exports = { CreateUser, testUser, Login,Logout };
