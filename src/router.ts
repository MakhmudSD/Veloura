import express from "express";
const router = express.Router();
import memberController from "../src/controllers/member.controller";
import uploader from "./libs/utils/uploader";
import productController from "./controllers/product.controller";

/** Member */
router.post("/member/login", memberController.login);
router.post("/member/signup", memberController.signup);
router.post(
  "/member/logout",
  memberController.verifyAuth,
  memberController.logout
);
router.get(
  "/member/detail",
  memberController.verifyAuth,
  memberController.getMemberDetail
);
router.post(
  "/member/update",
  memberController.verifyAuth,
  uploader("members").single("memberImage"),
  memberController.updateMember
);
router.get("/member/top-users", memberController.getTopUsers);
router.get("/member/barber", memberController.getBarber);

/** Product */

router.get(
  "/product/all",
  memberController.retrieveAuth,
  productController.getProducts
);
router.get(
  "/product/:id",
  memberController.retrieveAuth,
  productController.getProduct
);

/** Order */

export default router;
