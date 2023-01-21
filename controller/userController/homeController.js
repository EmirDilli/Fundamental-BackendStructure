const { default: mongoose } = require("mongoose");
const surahDB = require("../../models/surah");
const dotenv = require("dotenv");
dotenv.config();

module.exports.home = async (req, res) => {
  try {
    const fatiha = await surahDB.findById(
      mongoose.Types.ObjectId(process.env.DEFAULT_SURAH_ID)
    );
    const surahs = await surahDB
      .find({}, { surah_no: 1, _id: 1, name: 1 })
      .limit(20);
    console.log(surahs);
    res.status(200).json({
      detailedSurah: fatiha,
      surahList: surahs,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      message: "server error",
    });
  }
};
