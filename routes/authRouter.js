const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.post("/local/login", authController.localLogin);

router.post("/signup", authController.signup);

router.post("/logout", authController.logout);

router.post("/local/id/check", authController.checkId);

module.exports = router;
