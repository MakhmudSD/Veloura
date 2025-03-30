import Errors from "../libs/Errors";
import { T } from "../libs/types/common";
import { Request, Response } from "express";

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

productController.createNewProduct = async (req: Request, res: Response) => {
  {
    try {
      console.log("createNewProduct");
      res.send("File Uploaded Successfully");
    } catch (err) {
      console.log("ERROR on createNewProduct");
      if (err instanceof Errors) res.status(err.code).json(err);
      else res.status(Errors.standard.code).json(Errors.standard);
    }
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
