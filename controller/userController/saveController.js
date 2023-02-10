const express = require("express");
const { default: mongoose } = require("mongoose");
const surahDB = require("../../models/surah");
const userDB = require("../../models/user");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

module.exports.saveVerses = async (req, res) => {
  //checking if there is a server side error
  try {
    const data = req.body.data;
    const user = req.user;

    user.savedVerses = data;

    await user.save();

    return res.status(201).json({ message: "success" });
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
};

{
  data: [
    {
      surahNo: 5,
      verseNo: 2,
    },
    {
      surahNo: 5,
      verseNo: 2,
    },
    {
      surahNo: 5,
      verseNo: 2,
    },
  ];
}
