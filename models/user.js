const mongoose = require("mongoose");

const UserScheama = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bearerToken: {
    type: String,
  },
  forgotPassword: {
    code: {
      type: Number,
    },
    expireDate: {
      type: Date,
    },
  },

  resetToken: {
    type: String,
  },
  savedVerses: [
    {
      surahNo: Number,
      verseNo: Number,
    },
  ],
  completedVerses: [
    {
      surahNo: Number,
      verseNo: Number,
    },
  ],
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

module.exports = mongoose.model("users", UserScheama);
