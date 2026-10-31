import { validationResult } from "express-validator";
import deleteSyllabusLead from "../../services/syllabusLeadServices/deleteLead.service.js"

const deleteSyllabusLeadController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const download = await deleteSyllabusLead(req.params.id);

    if (!download) {
      return res.status(404).json({
        success: false,
        message: "Download record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Download record deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default deleteSyllabusLeadController;