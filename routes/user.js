const { Router } = require("express");
const { home } = require("../controller/userController/homeController");
const { saveVerses } = require("../controller/userController/saveController");
const { edit } = require("../controller/userController/editController");
const { removeAccount } = require("../controller/userController/removeAccount");
const isAuth = require("../utils/isAuth");
const {
  completeVerses,
} = require("../controller/userController/completeController");

const router = Router();

router.get("/home", home);
router.post("/saveVerses", isAuth, saveVerses);
router.post("/completeVerses", isAuth, completeVerses);
router.post("/edit", isAuth, edit);
router.post("/removeAccount", isAuth, removeAccount);

module.exports = router;
