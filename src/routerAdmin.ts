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
    barberController.signup
  );

routerAdmin
  .get("/login", barberController.getLogin)
  .post("/login", barberController.login);

routerAdmin.get("/logout", barberController.logout);
routerAdmin.get("/check-me", barberController.checkAuthSession);

routerAdmin
  .get(
    "/product/all",
    barberController.verifyBarber,
    productController.getAllProducts
  )
  .post(
    "/product/create",
    barberController.verifyBarber,
    makeUploader("products").single("productImage"),
    productController.createNewProduct
  )
  .post(
    "/product/update",
    barberController.verifyBarber,
    productController.updateChosenProduct
  );

export default routerAdmin;
