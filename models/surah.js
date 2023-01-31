const mongoose = require("mongoose");

const surahSchema = new mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  surah_no: Number,
  name: { nl: String },
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

module.exports = mongoose.model("surah", surahSchema);
