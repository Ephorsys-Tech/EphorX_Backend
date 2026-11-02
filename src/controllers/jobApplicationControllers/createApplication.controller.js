import { validationResult } from "express-validator";
import fs from "fs";
import createJobApplication from "../../services/jobApplicationServices/createApplication.service.js";

const createJobApplicationController = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty() === false) {
    if (req.file) fs.unlinkSync(req.file.path);

    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Resume is required",
    });
  }

  try {
    const resumePath = `/uploads/resumes/${req.file.filename}`;

    const application = await createJobApplication(
      req.body,
      resumePath
    );

    return res.status(201).json({
      success: true,
      message: "Job application submitted successfully",
      application,
    });
  } catch (error) {
    fs.unlinkSync(req.file.path);

    return res.status(
      error.message === "Job not found" ? 404 : 500
    ).json({
      success: false,
      message: error.message,
    });
  }
};

export default createJobApplicationController;