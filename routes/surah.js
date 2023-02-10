const { Router } = require("express");
const { search } = require("../controller/surahController/searchController");
const { detail } = require("../controller/surahController/detailController");
const {
  loadInterval,
} = require("../controller/surahController/loadIntervalController");
const isAuth = require("../utils/isAuth");
const {
  mealLoadInterval,
} = require("../controller/surahController/mealLoadIntervalController");

const router = Router();

router.get("/search", search);
router.get("/detail", detail);

//admin
router.post("/loadInterval", isAuth, loadInterval);
router.post("/mealLoadInterval", isAuth, mealLoadInterval);
module.exports = router;
