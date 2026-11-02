import { validationResult } from "express-validator";
import getJobApplicationById from "../../services/jobApplicationServices/getApplicationById.service.js";

const getJobApplicationByIdController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const application = await getJobApplicationById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Job application not found",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default getJobApplicationByIdController;