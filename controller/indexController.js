const createError = require("http-errors");
const userModel = require("../model/userModel");

exports.getMainPage = async function (req, res, next) {
  try {
    const responeData = {};
    if (req.user !== undefined) {
      const user = await userModel.getUserById(req.user);
      responeData["user"] = {
        is_login_status: true,
        username: user[0].username,
      };
    } else {
      responeData["user"] = { is_login_status: false };
    }

    res.render("index", { ...responeData });
  } catch (error) {
    console.log(error);
    next(createError(500, "server_error", { isShowErrPage: true }));
  }
};

// export.get

exports.getLoginPage = async function (req, res, next) {
  // res.render("login")
  const responeData = {};
    responeData["user"] = { is_login_status: false };
  
  res.render("login",{ ...responeData } );
};

exports.getSignUpPage = async function (req, res, next) {
  // res.render("signup");
  const responeData = {};

      responeData["user"] = { is_login_status: false };
  res.render("signup",{ ...responeData } );
};
