const express = require("express");
const { default: mongoose } = require("mongoose");
const surahDB = require("../../models/surah");
const dotenv = require("dotenv");
dotenv.config();

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

module.exports.detail = async (req, res) => {
  try {
    const { id } = req.query;
    const fatiha = await surahDB.findOne({ surah_no: 1 });
    if (!id) {
      return res.status(200).json({
        surah: fatiha,
      });
    } else {
      const surah = await surahDB.findById(mongoose.Types.ObjectId(id));
      if (surah)
        return res.status(200).json({
          surah: surah,
        });

      return res.status(200).json({
        surah: fatiha,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
};
