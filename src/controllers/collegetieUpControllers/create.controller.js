
import createCollegeTieUpService from "../../services/collegeTieUpServices/createCollege.service.js";

const createCollegeTieUpController = async (req, res) => {
  try {
    const { collegeName } = req.body;

    const college = await createCollegeTieUpService(
      collegeName,
      req.file
    );

    return res.status(201).json({
      success: true,
      message: "College tie-up created successfully.",
      data: college,
    });
  } catch (error) {
     return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to create college tie-up.",
    });
  }
};

export default createCollegeTieUpController;
