import express from 'express'
const routerAdmin = express.Router();
import barberController from "../src/controllers/barber.controller";

// /** BarberMaster */

routerAdmin.get("/", barberController.goHome);
routerAdmin
  .get("/signup", barberController.getSignup)
  .post("/signup", barberController.processSignup);

routerAdmin
.get("/login", barberController.getLogin)
// .post("/login", barberController.processLogin);


export default routerAdmin;



