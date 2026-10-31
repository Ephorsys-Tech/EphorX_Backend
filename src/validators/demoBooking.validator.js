import { body, param } from "express-validator";

export const createDemoBookingValidator = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
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
    .withMessage("Please select a course"),
];

export const updateDemoBookingValidator = [
  body("fullName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Full name cannot be empty"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
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

  body("qualification")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Qualification cannot be empty"),

  body("courseId")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Course ID cannot be empty"),
];

export const demoBookingIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid demo booking ID"),
];