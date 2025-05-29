import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import { AdminRequest, MemberInput, LoginInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/members.enum";
import MemberService from "../models/Member.service";
import Errors, { HttpCode, Message } from "../libs/Errors";

const memberService = new MemberService();
const adminController: T = {};

adminController.goHome = (req: Request, res: Response) => {
  try {
    res.render("home");
  } catch (err) {
    console.log("ERROR on Homepage");
    res.redirect("/admin");
  }
};

adminController.getSignup = (req: Request, res: Response) => {
  try {
    res.render("signup");
  } catch (err) {
    console.log("ERROR on Signup");
    res.redirect("/admin");
  }
};

adminController.getLogin = (req: Request, res: Response) => {
  try {
    res.render("login");
  } catch (err) {
    console.log("ERROR on Login");
    res.redirect("/admin");
  }
};

adminController.signup = async (req: AdminRequest, res: Response) => {
  try {
    console.log("signup");
    console.log("body", req.body);

    const newMember = req.body as unknown as MemberInput;
    newMember.memberType = MemberType.ADMIN;

    const result = await memberService.signup(newMember);
    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("Error on signup", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(`
      <script>
          alert("${message}");
          window.location.replace("/admin/signup");
      </script>
  `);
  }
};

adminController.login = async (req: AdminRequest, res: Response) => {
  try {
    console.log("login");
    console.log("body", req.body);

    const newMember = req.body as unknown as LoginInput;

    const result = await memberService.login(newMember);
    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("Error on login", err);
    const message =
      err instanceof Errors ? err.message : Message.NOT_AUTHENTICATED;
    res.send(`
      <script>
          alert("${message}");
          window.location.replace("/admin/login");
      </script>
  `);
  }
};

adminController.logout = async (req: AdminRequest, res: Response) => {
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

adminController.getUsers = async (req: Request, res: Response) => {
    try {
      console.log("getUsers");
      const result = await memberService.getUsers();
      res.render("users", { users: result });
    } catch (err) {
      console.log("ERROR on getUsers");
      res.status(500).send("Server error");
  }
};

adminController.updateChosenUser = async (req: Request, res: Response) => {
  {
    try {
      console.log("updateChosenUser");
      const { _id } = req.body;
      if (!_id || typeof _id !== "string") {
        return res.status(400).json({ message: "Missing or invalid _id" });
      }
      const result = await memberService.updateChosenUser(req.body);
      res.status(HttpCode.OK).json({ data: result });
    } catch (err) {
      console.log("ERROR on updateChosenUser:", err);
      if (err instanceof Errors) res.status(err.code).json(err);
      else res.status(Errors.standard.code).json(Errors.standard);
    }
  }
};

adminController.checkAuthSession = async (req: AdminRequest, res: Response) => {
  try {
    console.log("checkAuthSession");
    if (req.session?.member) {
      res.send(`<script> alert("${req.session.member.memberNick}")</script>`);
    } else {
      res.send(`<script> alert("${Message.NOT_AUTHENTICATED}")</script>`);
    }
  } catch (err) {
    console.log("Error on signup", err);
    res.redirect("/admin");
  }
};

adminController.verifyAdmin = async (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.member?.memberType === MemberType.ADMIN) {
    req.member = req.session.member;
    next();
  } else {
    const message = Message.NOT_AUTHENTICATED;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/login'); </script>`
    );
  }
};

export default adminController;
