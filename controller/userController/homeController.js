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

    let savedSurahs = [];
    if (user) {
      const map = new Map();
      for (let i = 0; i < user.savedVerses.length; i++) {
        if (!map.get(user.savedVerses[i].surahNo)) {
          map.set(user.savedVerses[i].surahNo, 1);
        }
      }

      const surahNoList = [];
      map.forEach(async (value, key) => {
        console.log(value, key);
        surahNoList.push(key);
      });

      console.log(surahNoList);
      savedSurahs = await surahDB.find({ surah_no: surahNoList });

      console.log(savedSurahs);
    }

    res.status(200).json({
      detailedSurah: nextSurah,
      surahList: surahs,
      savedVerses: user?.savedVerses,
      completedVerses: user?.completedVerses,
      savedSurahs: savedSurahs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
      message: "server error",
    });
  }
};
