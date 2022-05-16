const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const authRoutes = require("./auth.routes.js");
router.use("/auth", authRoutes)

const profileRoutes = require("./profile.routes.js");
router.use("/profile", profileRoutes)

const winesRoutes = require("./wines.routes.js");
router.use("/wines", winesRoutes)


module.exports = router;
