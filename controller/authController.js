const passport = require("passport");
const createError = require("http-errors");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

exports.localLogin = function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return next(createError(400, "not_contain_nessary_body"));
  }

  passport.authenticate("local", function (err, user, userError) {
    // new LocalStrategy(async function verify(username, password, cb){...}) 이후 작업

    // passport/localStrategy.js의 new LocalStrategy(...) 에서 예상치 못한 에러가 발생한 경우
    if (err) {
      console.error(err);
      return next(createError(500, "login_error"));
    }

    if (!user) {
      return next(userError);
    }

    // user정보 session storage에 저장
    return req.login(user, (err) => {
      if (err) {
        console.error(err);
        return next(createError(500, "login_error"));
      }

      res.status(201).json({ message: "Successfully login!" });
    });
  })(req, res, next);
};

exports.logout = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(createError(500, "logout_error"));
    }
    return res.status(201).json({ message: "Successfully logout!" });
  });
};

exports.signup = async function (req, res, next) {
  try {
    if (
      req.body.id === undefined ||
      req.body.password === undefined ||
      req.body.checkedPassword === undefined ||
      req.body.username === undefined ||
      req.body.email === undefined ||
      req.body.age === undefined ||
      req.body.gender === undefined 

    ) {
      return next(createError(400, "not_contain_nessary_body"));
    }

    const { id, password, checkedPassword, username , email , age, gender } = req.body;

    if (await userModel.checkIdDuplication(id)) {
      return next(createError(409, "id_duplication_error"));
    }

    if (password !== checkedPassword) {
      return next(createError(422, "pw_consistency_error"));
    }

    const hashedPassword = await bcrypt.hash(password, 12); //hash(패스워드, salt횟수)

    await userModel.addNewUser({
      id,
      hashedPassword,
      username,
      email,
      age,
      gender,
    });
    return res.status(201).json({ message: "Successfully signup!" });
  } catch (error) {
    next(error);
  }
};

exports.checkId = async function (req, res, next) {
  try {
    if (req.body.id === undefined) {
      return next(createError(400, "not_contain_nessary_body"));
    }

    if (await userModel.checkIdDuplication(req.body.id)) {
      return next(createError(409, "id_duplication_error"));
    }
    return res.status(200).json({ message: "this ID is valid" });
  } catch (error) {
    next(error);
  }
};
