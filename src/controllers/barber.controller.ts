import { Request, Response } from "express";
import {T} from "../libs/types/common";
import { AdminRequest, MemberInput, LoginInput } from "../libs/types/members";
import { MemberType } from "../libs/enums/members.enum";
import MemberService from "../models/Member.service";
import { Message } from "../libs/Errors";


const memberService = new MemberService();
const barberController: T = {};
barberController.goHome = (req: Request, res: Response) => {
  {
    try {
      res.render("home");
    } catch (err) {
      console.log("ERROR on Homepage");
      res.redirect("/admin");
    }
  }
};

barberController.getSignup = (req: Request, res: Response) => {
    {
      try {
        res.render("signup");
      } catch (err) {
        console.log("ERROR on Signup");
        res.redirect("/admin");
      }
    }
  };

  barberController.getLogin = (req: Request, res: Response) => {
    {
      try {
        res.render("login");
      } catch (err) {
        console.log("ERROR on Login");
        res.redirect("/admin");
      }
    }
  };

  barberController.signup = async (req: AdminRequest, res: Response) => {
    try {
      console.log("signup");
      console.log("body", req.body);

      const newMember = req.body as unknown as MemberInput;
      newMember.memberType = MemberType.BARBER;

      const result = await memberService.signup(newMember);
      req.session.member = result;
      req.session.save(function () {
        res.send(result);
      });
    } catch (err) {
      console.log("Error on signup", err);
      res.send(err);
    }
  };

  barberController.login = async(req: AdminRequest, res: Response) => {
    try {
      console.log("login")
      console.log("body", req.body);

      const newMember = req.body as unknown as LoginInput;

      const result = await memberService.login(newMember)
      req.session.member = result;
      req.session.save(function () {
        res.send(result);
      });
    } catch(err) {
      console.log("Error on login", err);
      res.send(err);
    }
  };

  barberController.logout = async (req: AdminRequest, res: Response) => {
    try {
      console.log("logout");
      req.session.destroy(function () {
        res.redirect("/admin");
      });
    } catch (err) {
      console.log("Error on signup", err);
      res.redirect("/admin");
    }
  };


  barberController.checkAuthSession = async (req: AdminRequest, res: Response) => {
    try {
      console.log("checkAuthSession");
      if(req.session?.member) {
        res.send(`<script> alert("${req.session.member.memberNick}")</script`);
      }
        else { res.send(`<script> alert("${Message.NOT_AUTHENTICATED}")</script`)}
      
    } catch (err) {
      console.log("Error on signup", err);
      res.redirect("/admin");
    }
  };

  export default barberController;