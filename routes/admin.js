const { Router } = require("express");
const surahUploadMulter = require("../services/uploadFileService.js");

const router = Router();

router.post("/uploadSurah", surahUploadMulter.single("sound"), verifyToken);

module.exports = router;
