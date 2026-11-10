import express from "express";

import uploadResume from "../middleware/uploadResume.middleware.js";

import createJobApplicationController from "../controllers/jobApplicationControllers/createApplication.controller.js";
import getAllJobsApplicationController from "../controllers/jobApplicationControllers/getAllApplication.controller.js"
import getJobApplicationByIdController from "../controllers/jobApplicationControllers/getApplicationById.controller.js";
import updateJobApplicationController from "../controllers/jobApplicationControllers/updateApplication.controller.js";
import deleteJobApplicationController from "../controllers/jobApplicationControllers/deleteApplication.controller.js";

import {
  createJobApplicationValidator,
  updateJobApplicationValidator,
  jobApplicationIdValidator,
} from "../validators/jobApplication.validator.js";

const router = express.Router();

// Create application
router.post(
  "/create-job",
  uploadResume.single("resume"),
  createJobApplicationValidator,
  createJobApplicationController
);

// Get all applications
router.get("/get-all-job", getAllJobsApplicationController);

// Get single application
router.get(
  "/get-job-by/:id",
  jobApplicationIdValidator,
  getJobApplicationByIdController
);

// Update application
router.put(
  "/update-job/:id",
  uploadResume.single("resume"),
  jobApplicationIdValidator,
  updateJobApplicationValidator,
  updateJobApplicationController
);

// Delete application
router.delete(
  "/delete-job/:id",
  jobApplicationIdValidator,
  deleteJobApplicationController
);

export default router;