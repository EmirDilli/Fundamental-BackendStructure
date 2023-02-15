const User = require("../../models/user");

const { comparePassword } = require("../../utils/hashing");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// const exampleBody = {
//   data: {
//     surahNo: 1,
//     kariName: "Serhat",
//     isMealSound: true,
//   },
// };

module.exports.userGetController = async (req, res) => {
  try {
    const page = req.body.page ?? 1;

    const users = await User.find()
      .skip((page - 1) * 50)
      .limit(50);

    return res.status(200).json({ message: "success", users });
  } catch (error) {
    return res.status(401).json({ message: "error", error });
  }
};
