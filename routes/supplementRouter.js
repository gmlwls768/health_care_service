const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");

router.get("/", async function (req, res, next) {
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
  res.render("supplement",{ ...responeData } );
});

module.exports = router;
  