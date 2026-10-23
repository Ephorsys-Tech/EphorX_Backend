
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

  return cb(new Error("Unexpected file field."));
};

const courseUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB per file
    files: 2,
  },
});

export default courseUpload;
