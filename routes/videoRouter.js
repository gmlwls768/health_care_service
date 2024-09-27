const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");

router.get("/", async function (req, res, next) {
  // res.render("activity");
  const responeData = {};
  console.log(req.user);
  if (req.user !== undefined) {
    const user = await userModel.getUserById(req.user);
    responeData["user"] = {
      is_login_status: true,
      username: user[0].username,
    };
  } else {
    responeData["user"] = { is_login_status: false };
  }
  res.render("video",{ ...responeData } );
});

module.exports = router;
