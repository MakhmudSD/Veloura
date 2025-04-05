import express from "express";
const routerAdmin = express.Router();

import barberController from "../src/controllers/barber.controller";
import productController from "./controllers/product.controller";
import makeUploader from "./libs/utils/uploader";

// /** BarberMaster */

routerAdmin.get("/", barberController.goHome);

routerAdmin
  .get("/signup", barberController.getSignup)
  .post(
    "/signup",
    makeUploader("members").single("memberImage"),
    barberController.signup // <-- fixed name
  );

routerAdmin
  .get("/login", barberController.getLogin)
  .post("/login", barberController.login); // <-- fixed name

routerAdmin.get("/logout", barberController.logout);
routerAdmin.get("/check-me", barberController.checkAuthSession);

// Products
routerAdmin
  .get(
    "/product/all",
    barberController.verifyBarber,
    productController.getAllProducts
  )
  .post(
    "/product/create",
    barberController.verifyBarber,
    makeUploader("products").array("productImages", 4),
    productController.createNewProduct
  )
  .post(
    "/product/:id",
    barberController.verifyBarber,
    productController.updateChosenProduct
  );

// Users
routerAdmin.get(
  "/user/all",
  barberController.verifyBarber,
  barberController.getUsers
);
routerAdmin.post(
  "/user/edit",
  barberController.verifyBarber,
  barberController.updateChosenUser
);

export default routerAdmin;