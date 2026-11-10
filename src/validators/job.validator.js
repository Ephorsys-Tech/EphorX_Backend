import { body, param } from "express-validator";

export const createJobValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Job title is required"),

  body("employmentType")
    .trim()
    .notEmpty()
    .withMessage("Employment type is required"),

  body("experience")
    .trim()
    .notEmpty()
    .withMessage("Experience is required"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required"),

  body("jobDescription")
    .trim()
    .notEmpty()
    .withMessage("Job description is required"),

  body("responsibilities")
    .isArray({ min: 1 })
    .withMessage("At least one responsibility is required"),

  body("responsibilities.*")
    .trim()
    .notEmpty()
    .withMessage("Responsibility cannot be empty"),

  body("requirements")
    .isArray({ min: 1 })
    .withMessage("At least one requirement is required"),

  body("requirements.*")
    .trim()
    .notEmpty()
    .withMessage("Requirement cannot be empty"),
];

export const updateJobValidator = [
  body("title").optional().trim().notEmpty(),

  body("employmentType").optional().trim().notEmpty(),

  body("experience").optional().trim().notEmpty(),

  body("location").optional().trim().notEmpty(),

  body("jobDescription").optional().trim().notEmpty(),

  body("responsibilities")
    .optional()
    .isArray({ min: 1 })
    .withMessage("At least one responsibility is required"),

  body("responsibilities.*")
    .optional()
    .trim()
    .notEmpty(),

  body("requirements")
    .optional()
    .isArray({ min: 1 })
    .withMessage("At least one requirement is required"),

  body("requirements.*")
    .optional()
    .trim()
    .notEmpty(),
];

export const jobIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid job ID"),
];