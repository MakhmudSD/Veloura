import { Request, Response } from "express";
import { T } from "../libs/types/common";

const memberController: T = {};

memberController.goHome = (req: Request, res: Response) => {
  {
    try {
      res.send("Homepage");
    } catch (err) {
      console.log("ERROR on Homepage", err);
    }
  }
};

memberController.getSignup = (req: Request, res: Response) => {
  {
    try {
      res.send("Signup page");
    } catch (err) {
      console.log("ERROR on Signup page");
    }
  }
};

memberController.getLogin = (req: Request, res: Response) => {
  {
    try {
      res.send("Login page");
    } catch (err) {
      console.log("ERROR on Login page");
    }
  }
};

export default memberController;
