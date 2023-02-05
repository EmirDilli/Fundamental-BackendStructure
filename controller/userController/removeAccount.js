const express = require("express");
const { default: mongoose } = require("mongoose");
const userDB = require("../../models/user");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
module.exports.removeAccount = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(404).json({
        message: "user does not exist",
      });
    }
    await userDB.deleteOne({ _id: user._id });
    res.status(200).json({
      message: "success",
    });
  } catch {
    res.status(500).json({
      message: "error",
    });
  }
};
