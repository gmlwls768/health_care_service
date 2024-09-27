const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const userModel = require("../model/userModel");

router.get("/", authMiddleware.isLoginStatus, async function (req, res, next) {
  // res.render("food");
  const responeData = {};
  const user = await userModel.getUserById(req.user);
  console.log(user);
      responeData["user"] = {
        is_login_status: true,
        username: user[0].username,
      };
  res.render("food",{ ...responeData } );
});

module.exports = router;
