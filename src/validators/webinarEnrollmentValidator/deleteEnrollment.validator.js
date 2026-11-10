import { param, validationResult } from "express-validator";

export const deleteEnrollmentValidator = [
  param("id")
    .isMongoId()
    .withMessage("Please provide a valid enrollment ID"),
];

export const validateDeleteEnrollment = (req, res, next) => {
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