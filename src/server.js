import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";

import { localsMiddleware } from "./middlewares";
import rootRouter from "./global/routers/rootRouter";
import memberRouter from "./member/routers/memberRouter";
import songRouter from "./song/routers/songRouter";


const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(flash());

app.use(localsMiddleware);
// app.use(adminPrivateMiddleware);

app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/public", express.static("src"));

app.use("/", rootRouter);
app.use("/member", memberRouter);
app.use("/music", songRouter);

// app.use((req, res, next) => {
//   res.status(404).render("error", {
//     pageTitle: "에러",
//     message: "페이지를 찾을 수 없습니다.",
//   });
// });

// app.use((err, req, res, next) => {
//   console.error(`💥 에러 발생 \n ${err.stack}`);
//   res.status(500).render("error", {
//     pageTitle: "오류",
//     message: "서버 오류가 발생하였습니다.",
//   });
// });

export default app;
