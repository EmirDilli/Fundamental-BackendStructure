const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Admin = require("../models/admin");

module.exports =
  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction}
   */

  async (req, res, next) => {
    try {
      //find JWT in Headers
      const token = req.headers["authorization"];
      if (!token) {
        return res.status(401).send("Acces Denied");
      } else {
        const bearerToken = token.split(" ")[1];
        const tokenDecode = jwt.verify(bearerToken, process.env.SECRET_KEY);
        const admin = await Admin.findById(
          new mongoose.Types.ObjectId(tokenDecode.admin_id)
        );

        if (!admin) {
          return res.status(401).json({
            message: "Admin not found",
          });
        }
        req.admin = admin;

        next();
      }
    } catch (error) {
      res.status(401).json({ message: "error", error });
    }
  };
