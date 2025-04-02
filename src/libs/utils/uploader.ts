import path from "path";
import multer from "multer";
import { v4 } from "uuid";
import fs from "fs";

function getTargetImageStorage(address: string) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join(__dirname, `../uploads/${address}`);

      // Ensure the directory exists
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const extension = path.parse(file.originalname).ext
      const randomName = v4() + extension;
      cb(null, randomName);
    },
  });
}

const makeUploader = (address: string) => {
  const productStorage = getTargetImageStorage(address);
  return multer({
    storage: productStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
  });
};

export default makeUploader;
