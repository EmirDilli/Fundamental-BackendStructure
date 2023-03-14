const authRoute = require("./routes/auth");
const express = require("express");
const isAuth = require("./utils/isAuth");
const userRoute = require("./routes/user");
const surahRoute = require("./routes/surah");
const adminRoute = require("./routes/admin");
var cors = require("cors");
const env = require("dotenv");
const app = express();
const PORT = 3001;
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded());

env.config();

app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`);
  next();
});
app.get("/", (req, res) => {
  res.json({
    message: "Server acitvated",
  });
});

//login and register routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/surah", surahRoute);
app.use("/api/v1/admin", adminRoute);

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    app.listen(
      process.env.PORT || PORT,
      () => `Port :${process.env.PORT || PORT}`
    );
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));
