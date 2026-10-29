
import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (
    file.fieldname === "thumbnail" ||
    file.fieldname === "instructorAvatar"
  ) {
    if (allowedTypes.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(
      new Error(`${file.fieldname} must be a JPEG, PNG, or WebP image.`)
    );
  }

  return cb(new Error(`Unexpected file field: ${file.fieldname}`));
};

const webinarUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 2,
  },
}).fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "instructorAvatar", maxCount: 1 },
]);

export default webinarUpload;
