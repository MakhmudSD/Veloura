import express from 'express'
const routerAdmin = express.Router();
import barberController from "../src/controllers/barber.controller";

// /** BarberMaster */

routerAdmin.get("/", barberController.goHome);
routerAdmin
  .get("/signup", barberController.getSignup)
  .post("/signup", barberController.signup);

routerAdmin
.get("/login", barberController.getLogin)
.post("/login", barberController.login);

routerAdmin.get("/logout", barberController.logout);
routerAdmin.get("/check-me", barberController.checkAuthSession);




export default routerAdmin;



