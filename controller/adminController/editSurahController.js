const Surah = require("../../models/surah");
const DeletedSurah = require("../../models/deletedSurah");

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const deleteFile = require("../../services/deleteFileService");

// const exampleBody = {
//   data: {
//     surahNo: 1,
//     kariName: "Serhat",
//     isMealSound: true,
//   },
// };

module.exports.editSurahController = async (req, res) => {
  try {
    const jsonString = req.body.data;
    if (!jsonString) {
      return res.status(400).json({
        message: "bad request",
      });
    }
    console.log(jsonString);
    const surahData = JSON.parse(jsonString);
    surahData._id = undefined;

    if (!surahData.sounds) {
      surahData.sounds = [];
    }

    if (!surahData.mealSounds) {
      surahData.mealSounds = [];
    }

    if (!surahData.details) {
      surahData.details = [];
    }

    if (!verifySurahData(surahData)) {
      return res
        .status(400)
        .json({ message: "error", error: "Surah data is not valid!" });
    }

    const oldSurah = await Surah.findOne({ surah_no: surahData.surah_no });

    console.log(oldSurah);

    if (!oldSurah) {
      return res.status(404).json({
        message: "error",
        error: `Surah not found with no: ${surahData.surah_no}`,
      });
    }

    checkFileDifference(oldSurah, surahData);

    await Surah.deleteOne({ surah_no: surahData.surah_no });

    const newSurah = Surah(surahData);
    await newSurah.save();

    return res.status(200).json({ message: "success", surah: newSurah });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "error", error });
  }
};

const verifySurahData = (surahData) => {
  // TODO: for now, it only support language nl

  // check basic props
  if (
    !surahData ||
    typeof surahData.surah_no != "number" ||
    !surahData.name ||
    typeof surahData.name.nl != "string" ||
    !surahData.explanation ||
    typeof surahData.explanation.nl != "string"
  ) {
    console.log("surah no, name or explanation does not exist");
    return false;
  }

  // check sounds
  let soundsError = false;
  surahData.sounds.forEach((sound) => {
    if (typeof sound.kari_name != "string" || typeof sound.url != "string") {
      soundsError = true;
    }
  });

  if (soundsError) {
    console.log("sounds are not valid");
    return false;
  }

  // check mealSounds
  let mealSoundsError = false;
  surahData.mealSounds.forEach((sound) => {
    if (typeof sound.kari_name != "string" || typeof sound.url != "string") {
      mealSoundsError = true;
    }
  });

  if (mealSoundsError) {
    console.log("meal are not valid");
    return false;
  }

  // check details
  let detailsError = false;
  let verseArray = [];
  surahData.details.forEach((detail) => {
    if (!detail.verse) {
      detailsError = true;
      console.log("details are not valid");
      return false;
    }
    verseArray.push(...detail.verse);
    if (typeof detail.text != "string" || !detail.meaning?.nl) {
      console.log("details text or meaning does not exist", detail);

      detailsError = true;
    }
  });

  if (detailsError) {
    return false;
  }

  //check verse indexes
  console.log(verseArray);

  for (let i = 1; i <= verseArray.length; i++) {
    if (!verseArray.includes(i)) {
      console.log(`verse ${i} is missing in verse list!`);
      return false;
    }
  }

  return true;
};

const checkFileDifference = (oldSurah, surahData) => {
  if (oldSurah.sounds && surahData.sounds) {
    const oldSurahFiles = oldSurah.sounds.map((sound) => sound.url);
    const updatedFiles = surahData.sounds.map((sound) => sound.url);

    console.log(oldSurahFiles);
    console.log(updatedFiles);

    const deletedFiles = oldSurahFiles.filter(
      (url) => !updatedFiles.includes(url)
    );

    console.log(deletedFiles);

    deletedFiles.forEach((fileUrl) =>
      deleteFile(fileUrl.split("digitaloceanspaces.com/")[1])
    );
  } else {
    console.error("Surah sounds not found");
  }
};
