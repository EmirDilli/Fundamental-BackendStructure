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
module.exports.home = async (req, res) => {
  try {
    let lastCompleted = +(req.query.lastCompleted ?? 0);
    let start;
    let end;

    //setting the range query
    if (lastCompleted < 6) {
      // first 20
      start = 0;
      end = 20;
    } else if (lastCompleted < 101) {
      // -5 +15 of lastCompleted
      start = lastCompleted - 5;
      end = lastCompleted + 14;
    } else {
      // last 20
      start = 95;
      end = 114;
    }

    //getting nextSurah as + 1
    let nextSurah;
    if (114 == lastCompleted) {
      nextSurah = await surahDB.findOne({
        surah_no: 1,
      });
    } else {
      nextSurah = await surahDB.findOne({
        surah_no: lastCompleted + 1,
      });
    }

    const surahs = await surahDB
      .find(
        { surah_no: { $gte: start, $lte: end } },
        { surah_no: 1, _id: 1, name: 1 }
      )
      .sort({ surah_no: 1 });

    res.status(200).json({
      detailedSurah: nextSurah,
      surahList: surahs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "server error",
    });
  }
};
