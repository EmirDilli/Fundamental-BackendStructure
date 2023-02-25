const express = require("express");
const { default: mongoose } = require("mongoose");
const surahDB = require("../../models/surah");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
module.exports.search = async (req, res) => {
  try {
    //getting the query parameter
    const { text } = req.query;
    console.log(req.query);
    //if text is empty it returns 20 surahs
    if (!text) {
      console.log("text not found. Default list is returning");
      const surahs = await surahDB
        .find({}, { _id: 1, name: 1, surah_no: 1 })
        .limit(20);
      return res.status(200).json({
        surahs,
      });
    }
    //if text is not empty
    else {
      console.log("text is: ", text);

      const surahs = await surahDB
        .find(
          {
            $or: [
              { "name.nl": { $regex: new RegExp(text, "i") } },
              { searchName: { $regex: new RegExp(text, "i") } },
            ],
          },
          { _id: 1, name: 1, surah_no: 1 }
        )
        .limit(20);

      res.status(200).json({
        message: "success",
        surahs,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "server error",
    });
  }
};
