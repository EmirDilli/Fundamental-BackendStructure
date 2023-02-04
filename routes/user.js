const { Router } = require("express");
const { home } = require("../controller/userController/homeController");
const { save } = require("../controller/userController/saveController");
const { edit } = require("../controller/userController/editController");
const isAuth = require("../utils/isAuth");

const router = Router();

router.get("/home", home);
router.post("/save", isAuth, save);
router.post("/edit", isAuth, edit);
router.post("/removeAccount", isAuth);

module.exports = router;
