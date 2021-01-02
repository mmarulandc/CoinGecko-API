const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const getAllCrytocurrencies = require("../controllers/cryptocurrencies/getAll");

// router.get("/getAllCurrencies/:page/:per_page", checkAuth, getAllCrytocurrencies)
router.get("/getAllCurrencies", checkAuth, getAllCrytocurrencies)

module.exports = router;