import { body, param } from "express-validator";

export const createJobApplicationValidator = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Enter a valid email")
    .normalizeEmail(),

  body("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),

  body("jobId")
    .trim()
    .notEmpty()
    .withMessage("Job ID is required")
    .isMongoId()
    .withMessage("Invalid job ID"),
];

export const updateJobApplicationValidator = [
  body("fullName").optional().trim().notEmpty(),

  body("email").optional().trim().isEmail().normalizeEmail(),

  body("phoneNumber").optional().trim().notEmpty(),

  body("jobId").optional().trim().isMongoId(),
];

export const jobApplicationIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid application ID"),
];