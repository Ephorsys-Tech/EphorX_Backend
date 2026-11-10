import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDirectory = path.join(
  process.cwd(),
  "uploads",
  "resumes"
);

fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}.pdf`;

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();

  if (
    extension === ".pdf" &&
    file.mimetype === "application/pdf"
  ) {
    return cb(null, true);
  }

  cb(new Error("Only PDF resume files are allowed"));
};

const uploadResume = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default uploadResume;