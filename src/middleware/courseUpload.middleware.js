
import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "image") {
    if (file.mimetype.startsWith("image/")) {
      return cb(null, true);
    }

    return cb(new Error("Course image must be an image file."));
  }

  if (file.fieldname === "syllabus") {
    if (file.mimetype === "application/pdf") {
      return cb(null, true);
    }

    return cb(new Error("Syllabus must be a PDF file."));
  }

  return cb(new Error(`Unexpected file field: ${file.fieldname}`));
};

const courseUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 2,
  },
}).fields([
  { name: "image", maxCount: 1 },
  { name: "syllabus", maxCount: 1 },
]);

export default courseUpload;
