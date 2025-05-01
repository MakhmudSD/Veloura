import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import {
  MemberInput,
  Member,
  LoginInput,
  ExtendedRequest,
  MemberUpdateInput,
} from "../libs/types/members";
import Errors, { HttpCode, Message } from "../libs/Errors";
import AuthService from "../models/Auth.service";
import { AUTH_TIMER } from "../libs/config";

const authService = new AuthService();
const memberService = new MemberService();
const memberController: T = {};

memberController.signup = async (req: Request, res: Response) => {
  {
    try {
      console.log("signup here!");
      console.log("body", req.body);

      const input: MemberInput = req.body,
        result: Member = await memberService.signup(input);
      const token = await authService.createToken(result);

      res.cookie("accessToken", token, {
        maxAge: AUTH_TIMER * 3600 * 1000,
        httpOnly: false,
      });
      res.status(HttpCode.CREATED).json({ member: result, accessToken: token });
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
      const token = await authService.createToken(result);

      res.cookie("accessToken", token, {
        maxAge: AUTH_TIMER * 3600 * 1000,
        httpOnly: false,
      });
      res.status(HttpCode.OK).json({ member: result, accessToken: token });
    } catch (err) {
      console.log("ERROR on Login page", err);
      if (err instanceof Errors) res.status(err.code).json(err);
      else res.status(Errors.standard.code).json(Errors.standard);
    }
  }
};

memberController.logout = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("logout here");
    res.cookie("accessToken", null, {
      maxAge: 0,
      httpOnly: true
    });
    res.status(HttpCode.OK).json({ logout: true });
  } catch (err) {
    console.log("ERROR on logout page", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.getMemberDetail = async (
  req: ExtendedRequest,
  res: Response
) => {
  try {
    console.log("getMemberDetail here");
    const result = await memberService.getMemberDetail(req.member);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("ERROR on getMemberDetail page", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.updateMember = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("updateMember here");
    const input: MemberUpdateInput = req.body as unknown as MemberUpdateInput;
    if (req.file) input.memberImage = req.file.path.replace(/\\/, "/");
    const result = await memberService.updateMember(req.member, input);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("ERROR on updateMember page", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.verifyAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["accessToken"];
    if (token) req.member = await authService.checkAuth(token);

    if (!req.member)
      throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED);
    next();
  } catch (err) {
    console.log("ERROR on verifyAuth page", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

memberController.retrieveAuth = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["accessToken"];
    if (token) req.member = await authService.checkAuth(token);

    next();
  } catch (err) {
    console.log("ERROR on retrieveAuth page", err);
    next();
  }
};

export default memberController;
