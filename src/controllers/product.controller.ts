import { ProductCategory } from "./../libs/enums/products.enum";
import { AdminRequest, ExtendedRequest } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import { Request, Response } from "express";
import { ProductInput, ProductInquiry } from "../libs/types/product";
import ProductService from "../models/Product.Service.";

const productService = new ProductService();

const productController: T = {};

productController.getProducts = async (req: Request, res: Response) => {
  try {
    console.log("getProducts here");
    const { order, page, limit, productCategory, search } = req.query;
    const inquiry: ProductInquiry = {
      order: String(order),
      page: Number(page),
      limit: Number(limit),
    };
    if (productCategory) {
      inquiry.productCategory = productCategory as ProductCategory;
    }
    if (search) inquiry.search = String(search);
    const result = await productService.getProducts(inquiry);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("ERROR on getProducts", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.getProduct = async (req: ExtendedRequest, res: Response) => {
  try {
    console.log("getProduct here");
    const { id } = req.params;
    const memberId = req.member?._id ?? null;
    const result = await productService.getProduct(memberId, id);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("ERROR on getProduct", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.getAllProducts = async (req: Request, res: Response) => {
  {
    try {
      console.log("getAllProducts");
      const data = await productService.getAllProducts();
      res.render("products", { products: data });
    } catch (err) {
      console.log("ERROR on getAllProducts", err);
      const message =
        err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
      res.send(`
          <script>
              alert("Succesfully created");
              window.location.replace("/admin/product/all");
          </script>
      `);
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
    res.send(`
      <script>
          alert("Succesfully created");
          window.location.replace("/admin/product/all");
      </script>
  `);
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
      const id = req.params.id;
      const result = await productService.updateChosenProduct(id, req.body);
      res.status(HttpCode.OK).json({ data: result });
      console.log("result", result);
    } catch (err) {
      console.log("ERROR on updateChosenProduct");
      if (err instanceof Errors) res.status(err.code).json(err);
      else res.status(Errors.standard.code).json(Errors.standard);
    }
  }
};

export default productController;
