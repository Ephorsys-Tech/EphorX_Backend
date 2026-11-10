import { validationResult } from "express-validator";
import fs from "fs";
import updateJobApplication from "../../services/jobApplicationServices/updateApplication.service.js";

const updateJobApplicationController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    if (req.file) fs.unlinkSync(req.file.path);

    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const resumePath = req.file
      ? `/uploads/resumes/${req.file.filename}`
      : undefined;

    const application = await updateJobApplication(
      req.params.id,
      req.body,
      resumePath
    );

    if (!application) {
      if (req.file) fs.unlinkSync(req.file.path);

      return res.status(404).json({
        success: false,
        message: "Job application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job application updated successfully",
      application,
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);

    return res.status(
      error.message === "Job not found" ? 404 : 500
    ).json({
      success: false,
      message: error.message,
    });
  }
};

export default updateJobApplicationController;