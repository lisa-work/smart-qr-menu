import multer from "multer"
import { Request } from "express"
import { randomUUID } from "crypto";
import path from "path/win32";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // cb(error, destination)
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