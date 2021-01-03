const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const getAllCrytocurrencies = require("../controllers/cryptocurrencies/getAll");
const addCurrency = require("../controllers/cryptocurrencies/addCurrency");
const upload = require('../utils/img-upload');
const { addCurrencyChecks, validate } = require("../utils/validations");

// router.get("/getAllCurrencies/:page/:per_page", checkAuth, getAllCrytocurrencies)
router.get("/getAllCurrencies", checkAuth, getAllCrytocurrencies)
router.post("/addCurrency", checkAuth , addCurrencyChecks(), validate, addCurrency);


module.exports = router;