const User = require("../../models/user");

const { comparePassword } = require("../../utils/hashing");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

module.exports.verifyToken = async (req, res) => {
  try {
    const { bearerToken } = req.body;

    const tokenDecode = jwt.verify(bearerToken, process.env.SECRET_KEY);
    console.log("token received", tokenDecode);
    const user = await User.findById(
      new mongoose.Types.ObjectId(tokenDecode.user_id)
    );
    console.log("got user: ", user);

    if (!user) {
      return res.status(404).json({ message: "user dos not exists" });
    }

    return res.status(200).json({ message: "success", user });
  } catch (error) {
    return res.status(401).json({ message: "error", error });
  }
};
