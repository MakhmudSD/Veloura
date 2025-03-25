import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./routerAdmin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config"

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan(MORGAN_FORMAT));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", router);
app.use("/admin", routerAdmin);

export default app;
