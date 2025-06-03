import path from "path";
import multer from "multer";
import { v4 } from "uuid";

function getTargetImageStorage(address: any) {
  return multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, `./uploads/${address}`);
    },
    filename: function (req, file, cb) {
      console.log(file);
      const extension = path.parse(file.originalname).ext;
      const random_name = v4() + extension;
      cb(null, random_name);
    },
  });
}
const makeUploader = (address: any) => {
  const product_storage = getTargetImageStorage(address);
  return multer({ storage: product_storage });
};

export default makeUploader;
