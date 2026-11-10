import { validationResult } from "express-validator";
import updateSyllabusLead from "../../services/syllabusLeadServices/updateLead.service.js"

const updateSyllabusLeadController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const download = await updateSyllabusLead(
      req.params.id,
      req.body
    );

    if (!download) {
      return res.status(404).json({
        success: false,
        message: "Download record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Download record updated successfully",
      download,
    });
  } catch (error) {
    return res.status(
      error.message.includes("not found") ? 404 : 500
    ).json({
      success: false,
      message: error.message,
    });
  }
};

export default updateSyllabusLeadController;