const { default: mongoose } = require("mongoose");
const express = require("express");
const surahDB = require("../../models/surah");
const userDB = require("../../models/user");
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
    let userId = req.query.userId;

    let user;
    if (userId) {
      user = await userDB.findById(mongoose.Types.ObjectId(userId));
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
        {},
        // { surah_no: { $gte: start, $lte: end } },
        { surah_no: 1, _id: 1, name: 1 }
      )
      .sort({ surah_no: 1 });

    res.status(200).json({
      detailedSurah: nextSurah,
      surahList: surahs,
      savedVerses: user?.savedVerses,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "server error",
    });
  }
};
