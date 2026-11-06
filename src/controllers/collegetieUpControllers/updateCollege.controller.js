
import updateCollegeTieUpService from "../../services/collegeTieUpServices/updateCollege.service.js"

const updateCollegeTieUpController = async (req, res) => {
  try {
    const college = await updateCollegeTieUpService(
      req.params.id,
      req.body,
      req.file
    );

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College tie-up not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "College tie-up updated successfully.",
      data: college,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update college tie-up.",
    });
  }
};

export default updateCollegeTieUpController;
