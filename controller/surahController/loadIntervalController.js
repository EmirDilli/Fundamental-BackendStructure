const express = require("express");
const { default: mongoose } = require("mongoose");
const surahDB = require("../../models/surah");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
module.exports.loadInterval = async (req, res) => {
  try {
    const jsonString = req.body.data;
    if (!jsonString) {
      return res.status(400).json({
        message: "bad request",
      });
    }
    const json = JSON.parse(jsonString);
    console.log(json);
    const surah_no = json.surah;
    const surah = await surahDB.findOne({ surah_no });
    if (!surah) {
      return res.status(404).json({
        message: "surah does not exist",
      });
    }
    const kari = json.kari;

    let soundObj;
    let counter = 0;
    surah.sounds.every((elmt) => {
      if (elmt.kari_name === kari) {
        console.log("kari 1");
        soundObj = elmt;
        return false;
      } else {
        console.log("kari 2");
        counter++;
        return false;
      }
    });

    if (!soundObj) {
      return res.status(404).json({
        message: "kari does not exist",
      });
    }
    console.log("geldi");

    let solution = [];

    let dbi = 0;
    let reqi = 0;
    while (dbi < surah.details.length) {
      console.log("geldi 2");
      if (surah.details[dbi].verse.length == json.details[reqi].verse.length) {
        const obje = json.details[reqi];
        solution.push(obje);
        dbi++;
        reqi++;
        console.log("high 1");
      } else if (
        surah.details[dbi].verse.length < json.details[reqi].verse.length
      ) {
        console.log("high 2");
        for (let i = 0; i < json.details[reqi].verse.length; i++) {
          const verse = surah.details[dbi].verse;
          i += verse.length - 1;
          solution.push({
            verse: verse,
            start: json.details[reqi].start,
            end: json.details[reqi].end,
          });
          dbi++;
        }
        reqi++;
      } else {
        const start = json.details[reqi].start;

        for (let i = 0; i < surah.details[dbi].verse.length; i++) {
          const verse = json.details[reqi].verse;
          i += verse.length - 1;

          if (i == surah.details[dbi].verse.length - 1) {
            const end = json.details[reqi].end;
            solution.push({
              verse: surah.details[dbi].verse,
              start: start,
              end: end,
            });
          }
          reqi++;
        }
        dbi++;
      }
    }
    console.log(solution);

    surah.sounds[counter].intervals = solution;
    await surah.save();

    return res.status(200).json({
      message: "success",
    });
  } catch {
    return res.status(500).json({
      message: "server error",
    });
  }
};
