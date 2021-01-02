const express = require("express");
const router = express.Router();
const signup = require("../controllers/auth/singup");
const login = require("../controllers/auth/login");
const { signupChecks, loginChecks, validate } = require("../utils/validations");

router.post("/signup", signupChecks(), validate, signup);
router.post("/login",  loginChecks(), validate, login)
module.exports = router;