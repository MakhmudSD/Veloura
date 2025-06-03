import { ExtendedRequest } from "../libs/types/member";
import { T } from "../libs/types/common";
import { Response } from "express";
import Errors, { HttpCode } from "../libs/Errors";
import OrderService from "../models/Order.service";
import { OrderInquiry, OrderUpdateInput } from "../libs/types/order";
import { OrderStatus } from "../libs/enums/orders.enum";

const orderController: T = {};
const orderService = new OrderService();

orderController.createOrder = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("createOrder here");

    if (!Array.isArray(req.body)) {
      return res
        .status(400)
        .json({ message: "Invalid input format. Expected an array." });
    }
    const result = await orderService.createOrder(req.member, req.body);

    res.status(HttpCode.CREATED).json(result);
  } catch (err) {
    console.log("ERROR on createOrder:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

orderController.getMyOrders = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getMyOrders here");

    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);

    const inquiry: OrderInquiry = {
      page: Number.isNaN(page) ? 1 : page,
      limit: Number.isNaN(limit) ? 10 : limit,
      orderStatus:
        (req.query.orderStatus as OrderStatus) || OrderStatus.PROCESS,
    };

    console.log("inquiry", inquiry);
    console.log("member", req.member);

    const result = await orderService.getMyOrders(req.member, inquiry);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("ERROR on getMyOrders:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

orderController.updateOrder = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("updateOrder here");

    const input = req.body as unknown as OrderUpdateInput;
    const result = await orderService.updateOrder(req.member, input);
    res.status(HttpCode.CREATED).json(result);
  } catch (err) {
    console.log("ERROR on updateOrder:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default orderController;
