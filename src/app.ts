import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./routerAdmin";
import cors from "cors";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";
import ConnectMongoDB from "connect-mongodb-session";
import session from "express-session";
import cookieParser from "cookie-parser";
import { T } from "./libs/types/common";

const MongDbStore = ConnectMongoDB(session);
const store = new MongDbStore({
  uri: String(process.env.MONGO_URL),
  collection: "sessions",
});

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("./uploads"));
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));

app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: 1000 * 60 * 24 * 7, // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  const sessionInstance = req.session as T;
  res.locals.member = sessionInstance.member;
  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", router);
app.use("/admin", routerAdmin);

export default app;
