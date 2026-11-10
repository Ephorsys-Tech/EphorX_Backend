
import { body, validationResult } from "express-validator";

export const updateEnrollmentValidators = [
  body("fullName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Full name cannot be empty")
    .isLength({ min: 2 })
    .withMessage("Full name must contain at least 2 characters"),

  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("phoneNumber")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Phone number cannot be empty"),

  body("whatsappNumber")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("WhatsApp number cannot be empty"),

  body("profession")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Profession cannot be empty"),
];

export const validateUpdateEnrollment = (req, res, next) => {
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

  // Prevent empty update requests
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please provide at least one field to update",
    });
  }

  next();
};
