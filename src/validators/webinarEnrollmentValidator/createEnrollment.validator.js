
import { body, validationResult } from "express-validator";

export const createEnrollmentValidator = [
  body("webinarId")
    .trim()
    .notEmpty()
    .withMessage("Webinar ID is required"),

  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2 })
    .withMessage("Full name must contain at least 2 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),

  body("whatsappNumber")
    .trim()
    .notEmpty()
    .withMessage("WhatsApp number is required"),

  body("profession")
    .trim()
    .notEmpty()
    .withMessage("Profession is required"),
];

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  next();
};
