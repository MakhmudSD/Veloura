import { AdminRequest } from "../libs/types/members";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { Request, Response } from "express";
import { ProductInput } from "../libs/types/product";
import ProductService from "../models/Product.Service.";

const productService = new ProductService();

const productController: T = {};

productController.getAllProducts = async (req: Request, res: Response) => {
  {
    try {
      console.log("getAllProducts");
      res.render("products");
    } catch (err) {
      console.log("ERROR on getAllProducts");
      if (err instanceof Errors) res.status(err.code).json(err);
      else res.status(Errors.standard.code).json(Errors.standard);
    }
  }
};

productController.createNewProduct = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("createNewProduct");
    console.log("req.files:", req.files);

    if (!req.files?.length)
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);

    const data = req.body as unknown as ProductInput;
    data.productImages = req.files.map((ele) => {
      return ele.path;
    });

    await productService.createNewProduct(data);
    res.send("File Uploaded Successfully!!!");
  } catch (err) {
    console.log("ERROR on createNewProduct:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.updateChosenProduct = async (req: Request, res: Response) => {
  {
    try {
      console.log("updateChosenProduct");
    } catch (err) {
      console.log("ERROR on updateChosenProduct");
      if (err instanceof Errors) res.status(err.code).json(err);
      else res.status(Errors.standard.code).json(Errors.standard);
    }
  }
};

export default productController;
