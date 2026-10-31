import express from "express";
import createJobController from "../controllers/jobControllers/createJob.controller.js";
import getAllJobsController from "../controllers/jobControllers/getAllJobs.controller.js";
import getJobByIdController from "../controllers/jobControllers/getJobById.controller.js";
import updateJobController from "../controllers/jobControllers/updateJob.controller.js";
import deleteJobController from "../controllers/jobControllers/deleteJob.controller.js";

import {createJobValidator,
       jobIdValidator,
       updateJobValidator} from "../validators/job.validator.js"





const router = express.Router();

// Create job
router.post(
  "/create-job",
  createJobValidator,
  createJobController
);

// Get all jobs
router.get(
  "/get-all-job",
  getAllJobsController
);

// Get single job
router.get(
  "/get-job-by/:id",
  jobIdValidator,
  getJobByIdController
);

// Update job
router.put(
  "/update-job/:id",
  jobIdValidator,
  updateJobValidator,
  updateJobController
);

// Delete job
router.delete(
  "/delete-job/:id",
  jobIdValidator,
  deleteJobController
);

export default router;