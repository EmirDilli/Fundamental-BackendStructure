const { default: mongoose } = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const adminDB = require("../../models/admin");
const { hashPassword, comparePassword } = require("../../utils/hashing");
dotenv.config();

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
module.exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Open to create user
    // const hashedPassword = hashPassword(password);
    // await adminDB.create({ password: hashedPassword, username, username });

    if (!username || !password) {
      return response.status(400).json({
        message: "username or password can not be empty",
      });
    }

    //getting the related user in the database
    const admin = await adminDB.findOne({ username });
    console.log(admin);
    if (!admin)
      return response.status(401).json({
        message: "error",
        error: {
          username: "username does not exist",
        },
      });

    //comparing whether the password is true
    const isValid = comparePassword(password, admin.password);
    if (isValid) {
      console.log("Authenticated Successfully!");
      const token = jwt.sign(
        {
          admin_id: admin._id,
          username: admin.username,
          isAdmin: true,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1y", //TODO: expires in one day it can be change
        }
      );
      return res.status(200).json({
        token,
        message: "success",
      });
    } else {
      console.log("Failed to Authenticate");
      return res.status(401).json({
        message: "error",
        error: {
          password: "Password is not correct!",
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "server error",
    });
  }
};
