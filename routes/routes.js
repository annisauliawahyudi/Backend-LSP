const express = require("express");
const router = express.Router();
const { authMiddleware, restrictTo } = require("../middleware/authMiddleware");
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

// Admin-only route
router.get("/admin", authMiddleware, restrictTo("admin"), (req, res) => {
  res.send("Welcome Admin");
});

// Asesor-only route
router.get("/asesor", authMiddleware, restrictTo("asesor"), (req, res) => {
  res.send("Welcome Asesor");
});

// Asesi-only route
router.get("/asesi", authMiddleware, restrictTo("asesi"), (req, res) => {
  res.send("Welcome Asesi");
});

module.exports = router;
