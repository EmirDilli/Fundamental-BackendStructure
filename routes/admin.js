const { Router } = require("express");
const {
  editSurahController,
} = require("../controller/adminController/editSurahController.js");
const {
  getSurahList,
} = require("../controller/adminController/getSurahList.js");
const {
  uploadSurahController,
} = require("../controller/adminController/uploadSurahHandler.js");
const {
  userGetController,
} = require("../controller/adminController/userGetController.js");
const surahUploadMulter = require("../services/uploadFileService.js");

const router = Router();

router.post(
  "/uploadSurah",
  surahUploadMulter.single("sound"),
  uploadSurahController
);
router.get("/users", userGetController);
router.post("/editSurah", editSurahController);
router.get("/surahs", getSurahList);

module.exports = router;
