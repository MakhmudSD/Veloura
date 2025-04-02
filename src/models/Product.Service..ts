import { ProductInput } from "../libs/types/product";
import ProductModel from "../schema/Product.model";
import { Product } from "../libs/types/product";
import Errors, { Message } from "../libs/Errors";
import { HttpCode } from "../libs/Errors";

class ProductService {
  private readonly productModel;

  constructor() {
    this.productModel = ProductModel;
  }

  /** SPA */

  /** SSR */

  public async createNewProduct(input: ProductInput): Promise<Product> {
    try {
      const result = await this.productModel.create(input);
      return result as unknown as Product;
    } catch (err) {
      console.log("ERROR, model: createNewProduct", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.NO_MEMBER_NICK);
    }
  }
}

export default ProductService

