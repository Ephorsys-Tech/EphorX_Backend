import { body, param } from "express-validator";

export const createSyllabusLeadValidator = [
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

  body("whatsappNumber")
    .trim()
    .notEmpty()
    .withMessage("WhatsApp number is required"),

  body("qualification")
    .trim()
    .notEmpty()
    .withMessage("Qualification is required"),

  body("courseId")
    .trim()
    .notEmpty()
    .withMessage("Course is required")
    .isMongoId()
    .withMessage("Invalid course ID"),
];

export const updateSyllabusLeadValidator = [
  body("fullName").optional().trim().notEmpty(),

  body("email").optional().trim().isEmail().normalizeEmail(),

  body("phoneNumber").optional().trim().notEmpty(),

  body("whatsappNumber").optional().trim().notEmpty(),

  body("qualification").optional().trim().notEmpty(),

  body("courseId").optional().trim().isMongoId(),
];

export const syllabusLeadIdValidator = [
  param("id").isMongoId().withMessage("Invalid download ID"),
];