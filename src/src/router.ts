import express from "express";
const router = express.Router();

import memberController from "../src/controllers/member.controller";
import productController from "./controllers/product.controller";
import uploader from "./libs/utils/uploader";
import orderController from "./controllers/order.controller";

/** Member Routes */
router.post("/member/login", memberController.login);
router.post(
  "/member/logout",
  memberController.verifyAuth,
  memberController.logout
);
router.post("/member/signup", memberController.signup);
router.post(
  "/member/update",
  memberController.verifyAuth,
  uploader("members").single("memberImage"),
  memberController.updateMember
);
router.get("/member/admin", memberController.getAdmin);
router.get(
  "/member/detail",
  memberController.verifyAuth,
  memberController.getMemberDetail
);
router.get("/member/top-users", memberController.getTopUsers);

/** Product Routes */
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

/** Order Routes */
router.post(
  "/order/create",
  memberController.verifyAuth,
  orderController.createOrder
);
router.get(
  "/order/all",
  memberController.verifyAuth,
  orderController.getMyOrders
);

router.post(
  "/order/update",
  memberController.verifyAuth,
  orderController.updateOrder
);

export default router;
