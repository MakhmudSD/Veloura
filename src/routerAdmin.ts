import express from 'express'
const routerAdmin = express.Router();
import barberController from "../src/controllers/barber.controller";

// /** BarberMaster */

routerAdmin.get("/", barberController.goHome)
routerAdmin.get("/signup", barberController.getSignup);

routerAdmin.get("/login", barberController.getLogin);

export default routerAdmin;



