const { Router } = require("express");
const {
  editSurahController,
} = require("../controller/adminController/editSurahController.js");
const {
  getSurahList,
} = require("../controller/adminController/getSurahList.js");
const {
  adminLogin,
} = require("../controller/adminController/adminLoginHandler.js");
const {
  uploadSurahController,
} = require("../controller/adminController/uploadSurahHandler.js");
const {
  userGetController,
} = require("../controller/adminController/userGetController.js");
const {
  loadInterval,
} = require("../controller/surahController/loadIntervalController.js");
const surahUploadMulter = require("../services/uploadFileService.js");
const isAdminAuth = require("../utils/isAdminAuth.js");

const router = Router();

router.post(
  "/uploadSurah",
  surahUploadMulter.single("sound"),
  uploadSurahController
);
router.get("/users", isAdminAuth, userGetController);
router.put("/surah", isAdminAuth, editSurahController);
router.get("/surahs", isAdminAuth, getSurahList);
router.post("/loadInterval", isAdminAuth, loadInterval);
router.post("/login", adminLogin);

module.exports = router;
