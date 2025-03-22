import { Request, Response } from "express";
import {T} from "../libs/types/common";

const barberController: T = {};
barberController.goHome = (req: Request, res: Response) => {
  {
    try {
      res.send("Homepage");
    } catch (err) {
      console.log("ERROR on Homepage");
    }
  }
};

barberController.getSignup = (req: Request, res: Response) => {
    {
      try {
        res.send("Signup");
      } catch (err) {
        console.log("ERROR on Signup");
      }
    }
  };

  barberController.getLogin = (req: Request, res: Response) => {
    {
      try {
        res.send("Login");
      } catch (err) {
        console.log("ERROR on Login");
      }
    }
  };

  export default barberController;