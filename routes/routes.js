const express = require("express");
const router = express.Router();
const { authMiddleware, restrictTo } = require("../middleware/authMiddleware");
const { register, login } = require("../controllers/authController");
const { getSkema, storeSkema } = require("../controllers/skemaController");
const { getUnit, storeUnit, updateUnit, deleteUnit } = require("../controllers/unitController");
const { getElemen, storeElemen, updateElemen, deleteElemen } = require("../controllers/elemenController");
const { getAllKUKs, createKUK, updateKUK, deleteKUK } = require("../controllers/KUKController"); 

// Authentication routes
router.post("/register", register);
router.post("/login", login);
router.get("/login", login);

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

// Skema routes
router.get("/skema", getSkema);
router.post("/skema", storeSkema);

// Unit routes
router.get("/unit", getUnit);
router.post("/unit", storeUnit);
router.put("/unit/:id", updateUnit);
router.delete("/unit/:id", deleteUnit);

// Elemen routes
router.get("/elemen", getElemen);
router.post("/elemen", storeElemen);
router.put("/elemen/:id", updateElemen);
router.delete("/elemen/:id", deleteElemen);

// KUK routes
router.get("/kuk", getAllKUKs); 
router.post("/kuk", createKUK); 
router.put("/kuk/:id", updateKUK);
router.delete("/kuk/:id", deleteKUK); 

module.exports = router;
