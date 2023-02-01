const express = require("express");
const { default: mongoose } = require("mongoose");
const surahDB = require("../../models/surah");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
module.exports.mealLoadInterval = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    if (!data) {
      return res.status(400).json({ error: "bad request" });
    }

    const surahNo = data.surah;
    const surah = await surahDB.findOne({ surah_no: surahNo });
    if (!surah) {
      return res.status(404).json({
        message: "surah does not exist",
      });
    }

    const details = surah.details;
    if (details.length !== data.details.length) {
      return res
        .status(409)
        .json({ error: "verse's length are not compatible" });
    }
    for (let i = 0; i < details.length; i++) {
      for (let j = 0; j < details[i].verse.length; j++) {
        if (details[i].verse[j] !== data.details[i].verse[j]) {
          return res.status(409).json({
            message: "verses are not compatible",
          });
        }
      }
    }

    const index = surah.mealSounds.findIndex((cp) => {
      return cp.kari_name.toString() === data.kari.toString();
    });

    surah.mealSounds[index].intervals = data.details;
    await surah.save();
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
};
