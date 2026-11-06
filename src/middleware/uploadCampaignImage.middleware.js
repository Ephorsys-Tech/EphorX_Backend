
import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.fieldname !== "campaignImage") {
    return cb(new Error(`Unexpected file field: ${file.fieldname}`));
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new Error("Campaign image must be a JPEG, PNG, or WebP image.")
    );
  }

  cb(null, true);
};

const campaignUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
}).single("campaignImage");

export default campaignUpload;
