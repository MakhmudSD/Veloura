import { HttpCode, Message } from "../libs/Errors";
import { View, ViewInput } from "../libs/types/view";
import ViewModel from "../schema/View.model";
import Errors from "../libs/Errors";

class ViewService {
  private readonly viewModel;

  constructor() {
    this.viewModel = ViewModel;
  }

  public async checkViewExistence(input: ViewInput): Promise<View | null> {
    const result = await this.viewModel
      .findOne({ memberId: input.memberId, viewRefId: input.viewRefId })
      .exec();
    return result as View | null;
  }

  public async insertMemberView(input: ViewInput): Promise<View> {
    try {
      const result = await this.viewModel.create(input);
      return result as unknown as View;
    } catch (err) {
      console.error("ERROR on insertMemberView", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
}
export default ViewService;
