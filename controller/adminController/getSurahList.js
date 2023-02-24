const { default: mongoose } = require("mongoose");
const express = require("express");
const surahDB = require("../../models/surah");
const dotenv = require("dotenv");
dotenv.config();

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
module.exports.getSurahList = async (req, res) => {
  try {
    const surahs = await surahDB
      .find(
        {},
        // { surah_no: { $gte: start, $lte: end } },
        { surah_no: 1, _id: 1, name: 1 }
      )
      .sort({ surah_no: 1 });

    res.status(200).json({
      data: surahs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "server error",
    });
  }
};
