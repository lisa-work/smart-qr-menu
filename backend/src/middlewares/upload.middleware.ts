import multer from "multer"
import { Request } from "express"
import { randomUUID } from "crypto";
import path from "path";
import fs from "fs";
import { UPLOADS_DIR } from "../config/paths";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subfolder = file.fieldname === "logo" ? "logos" : "foods";
    const folder = path.join(UPLOADS_DIR, subfolder);

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    cb(null, folder); // cb(error, destination)
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, `${randomUUID()}${extension}`);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
    cb(new Error("Only image files are allowed."));
    }
}

const upload = multer({ 
    storage, 
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
 });

export default upload;