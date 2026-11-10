import { validationResult } from "express-validator";
import getSyllabusLeadById from "../../services/syllabusLeadServices/getByIdLead.service.js"

const getSyllabusLeadByIdController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const download = await getSyllabusLeadById(req.params.id);

    if (!download) {
      return res.status(404).json({
        success: false,
        message: "Download record not found",
      });
    }

    return res.status(200).json({
      success: true,
      download,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default getSyllabusLeadByIdController;