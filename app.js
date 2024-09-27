const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const passport = require("passport");
const passportConfig = require("./passport"); // passport/index.js 폴더 임포트(index.js는 생략가능)

const indexRouter = require("./routes/indexRouter");
const authRouter = require("./routes/authRouter");
const inbodyRouter = require("./routes/inbodyRouter");
const inbodyApiRouter = require("./routes/inbodyApiRouter");

const weightTraceRouter = require("./routes/weightTraceRouter");
const weightTraceApiRouter = require("./routes/weightTraceApiRouter");
const bmiRouter = require("./routes/bmiRouter");
const bmiApiRouter = require("./routes/bmiApiRouter");
const bmiUpdateApiRouter = require("./routes/bmiUpdateApiRouter");


const activityRouter = require("./routes/activityRouter");
const activityApiRouter = require("./routes/activityApiRouter");
const videoRouter = require("./routes/videoRouter");
const supplementRouter = require("./routes/supplementRouter");
const dietRouter = require("./routes/dietRouter");
const dietApiRouter = require("./routes/dietApiRouter");
const dietUpdateApiRouter = require("./routes/dietUpdateApiRouter");
const supplementApiRouter = require("./routes/supplementApiRouter");
const foodRouter = require("./routes/foodRouter");
const foodApiRouter = require("./routes/foodApiRouter");
const videoApiRouter = require("./routes/videoApiRouter");


const app = express();
const port = 8080;

// EJS를 템플릿 엔진으로 설정
app.set("view engine", "ejs");

// 정적 파일(css, 이미지 등)을 제공하기 위한 미들웨어
// 서버의 파일 구조를 숨길 수 있음
// http://localhost:8080/image/toast.jpeg로 테스트 => 실제로는 public/image/toast.jpeg에 존재하지만 pulic이 URL에 없음
app.use(express.static("public"));
app.use(logger("dev"));
dotenv.config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    store: new SQLiteStore({ db: "session.db", dir: "./session" }),
    cookie: { maxAge: 3600000 }, // 1 hours (= 1 * 60 * 60 * 1000 ms)
  })
);

passportConfig();
app.use(passport.authenticate("session")); // authenticate the session.

app.use("/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/inbody", inbodyApiRouter);
app.use("/api/weightTrace", weightTraceApiRouter);
app.use("/api/bmi", bmiApiRouter);
app.use("/api/bmiUpdate", bmiUpdateApiRouter);
app.use("/api/activity", activityApiRouter);
app.use("/api/diet", dietApiRouter);
app.use("/api/dietUpdate", dietUpdateApiRouter);
app.use("/api/supplement", supplementApiRouter);
app.use("/api/video", videoApiRouter);
app.use("/api/food", foodApiRouter);



app.use("/inbody", inbodyRouter);
app.use("/weightTrace", weightTraceRouter);
app.use("/bmi", bmiRouter);
app.use("/activity", activityRouter);
app.use("/video", videoRouter);
app.use("/supplement", supplementRouter);
app.use("/diet", dietRouter);
app.use("/food", foodRouter);

app.use((err, req, res, next) => {
  console.error(err);
  if (err.status) return res.status(err.status).send({ message: err.message });
  return res.status(500).send({ message: "server_error" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
