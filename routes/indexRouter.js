const express = require("express");
const router = express.Router();
const indexController = require("../controller/indexController");

router.get("/", indexController.getMainPage);

router.get("/login", indexController.getLoginPage);

router.get("/signup", indexController.getSignUpPage);



module.exports = router;
