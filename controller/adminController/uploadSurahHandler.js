const Surah = require("../../models/surah");

const { comparePassword } = require("../../utils/hashing");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// const exampleBody = {
//   surahNo: 1,
//   kariName: "Serhat",
//   isMealSound: true,
// };

module.exports.uploadSurahController = async (req, res) => {
  try {
    const surahData = req.query;
    console.log(req.file);

    const sound = req.file.key;

    if (!sound) {
      res.status(404).json({ error: "sound file not found", message: "error" });
    }

    const surah = await Surah.findOne({ surah_no: surahData.surahNo });

    if (!surah) {
      res.status(404).json({ error: "surah not found", message: "error" });
    }

    if (!surah.sounds) {
      surah.sounds = [];
    }

    if (!surah.mealSounds) {
      surah.mealSounds = [];
    }

    const soundObject = {
      kari_name: surahData.kariName,
      url: `${process.env.SPACE_URL}/${sound}`,
    };

    if (surahData.isMealSound) {
      surah.mealSounds.push(soundObject);
    } else {
      surah.sounds.push(soundObject);
    }

    await surah.save();

    return res.status(200).json({ message: "success", surah });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "error", error });
  }
};
