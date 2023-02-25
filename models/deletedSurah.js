const mongoose = require("mongoose");

const deletedSurahSchema = new mongoose.Schema({
  surah_no: Number,
  name: { nl: String },
  searchName: String,
  explanation: { nl: String },
  sounds: [
    {
      kari_name: String, //sesin sahibi **şimdilik serhat dew
      url: String, //şimdilik hepsine şu linki ver
      intervals: [
        {
          verse: [Number],
          start: Number,
          end: Number,
        },
      ],
    },
  ],
  mealSounds: [
    {
      kari_name: String, //sesin sahibi **şimdilik serhat dew
      url: String, //şimdilik hepsine şu linki ver
      intervals: [
        {
          verse: [Number],
          start: Number,
          end: Number,
        },
      ],
    },
  ],
  details: [
    {
      verse: [Number],
      meaning: { nl: String },
      explanation: { nl: String },
      text: String,
    },
  ],
});

module.exports = mongoose.model("deletedSurah", deletedSurahSchema);
