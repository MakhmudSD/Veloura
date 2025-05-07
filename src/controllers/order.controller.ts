import { ExtendedRequest } from "../libs/types/member";
import { T } from "../libs/types/common";
import { Response } from "express";
import Errors, { HttpCode } from "../libs/Errors";
import OrderService from "../models/Order.service";
import { OrderInquiry, OrderUpdateInput } from "../libs/types/order";
import { OrderStatus } from "../libs/enums/orders.enum";

const orderController: T = {}
const orderService = new OrderService()

orderController.createOrder = async (req: ExtendedRequest, res: Response) => {
    try {
      console.log("createOrder here");
  
      if (!Array.isArray(req.body)) {
        return res.status(400).json({ message: "Invalid input format. Expected an array." });
      }
      const result = await orderService.createOrder(req.member, req.body);
  
      res.status(HttpCode.CREATED).json(result);
    } catch (err) {
      console.log("ERROR on createOrder:", err);
      if (err instanceof Errors) res.status(err.code).json(err);
      else res.status(Errors.standard.code).json(Errors.standard);
    }
  };
  

export default orderController