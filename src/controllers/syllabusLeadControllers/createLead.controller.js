import { validationResult } from "express-validator";
import createSyllabusLead from "../../services/syllabusLeadServices/createLead.service.js";

const createSyllabusLeadController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const result = await createSyllabusLead(req.body);

    return res.status(201).json({
      success: true,
      message: "Details saved successfully",
      download: result.download,
      syllabusUrl: result.syllabusUrl,
    });
  } catch (error) {
    return res.status(
      error.message.includes("not found") ||
      error.message.includes("not available") ? 404 : 500
    ).json({
      success: false,
      message: error.message,
    });
  }
};

export default createSyllabusLeadController;