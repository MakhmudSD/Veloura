import { Request, Response } from "express";
import {T} from "../libs/types/common";
import { Member, MemberInput } from "../libs/types/members";
import { MemberType } from "../libs/enums/members.enum";
import MemberService from "../models/Member.service";


const memberService = new MemberService();
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

  barberController.signup = async(req: Request, res: Response) => {
    try {
      console.log("processSignup")
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
      console.log("processSignup")
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