import { Request, Response } from "express";
import {T} from "../libs/types/common";
import { MemberInput } from "../libs/types/members";
import { MemberType } from "../libs/enums/members.enum";
import MemberService from "../models/Member.service";


const memberService = new MemberService();
const barberController: T = {};
barberController.goHome = (req: Request, res: Response) => {
  {
    try {
      res.render("home");
    } catch (err) {
      console.log("ERROR on Homepage");
    }
  }
};

barberController.getSignup = (req: Request, res: Response) => {
    {
      try {
        res.render("signup");
      } catch (err) {
        console.log("ERROR on Signup");
      }
    }
  };

  barberController.getLogin = (req: Request, res: Response) => {
    {
      try {
        res.render("login");
      } catch (err) {
        console.log("ERROR on Login");
      }
    }
  };

  barberController.signup = async(req: Request, res: Response) => {
    try {
      console.log("signup")
      console.log("body", req.body);

      const newMember: MemberInput = req.body;
      newMember.memberType = MemberType.BARBER;

      const result = await memberService.signup(newMember)

      res.send(result)
    } catch(err) {
      console.log("Error on signup", err);
      res.send(err);
    }
  }

  barberController.login = async(req: Request, res: Response) => {
    try {
      console.log("login")
      console.log("body", req.body);

      const newMember: MemberInput = req.body;

      const result = await memberService.login(newMember)

      res.send(result)
    } catch(err) {
      console.log("Error on login", err);
      res.send(err);
    }
  };

  export default barberController;