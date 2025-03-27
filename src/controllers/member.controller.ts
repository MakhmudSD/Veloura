import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { MemberInput, Member, LoginInput } from "../libs/types/members";
import Errors from "../libs/Errors";

const memberService = new MemberService();
const memberController: T = {};

memberController.signup = async (req: Request, res: Response) => {
  {
    try {
      console.log("signup here!");
      console.log("body", req.body);

      const input: MemberInput = req.body,
        result: Member = await memberService.signup(input);
      // TODO: Tokens Authentication

      res.json({ member: result });
    } catch (err) {
      console.log("ERROR on Signup page", err);
      if (err instanceof Errors) res.status(err.code).json(err);
      else res.status(Errors.standard.code).json(Errors.standard);
    }
  }
};

memberController.login = async (req: Request, res: Response) => {
  {
    try {
      console.log("login here");
      const input: LoginInput = req.body,
        result: Member = await memberService.login(input);

      res.json({ member: result });
    } catch (err) {
      console.log("ERROR on Login page", err);
      if (err instanceof Errors) res.status(err.code).json(err);
      else res.status(Errors.standard.code).json(Errors.standard);
    }
  }
};

export default memberController;
