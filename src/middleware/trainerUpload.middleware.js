
import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "avatar") {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(
      new Error("Trainer avatar must be a JPEG, PNG, or WebP image.")
    );
  }

  return cb(new Error(`Unexpected file field: ${file.fieldname}`));
};

const trainerUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
    files: 1,
  },
}).single("avatar");

export default trainerUpload;
