
import deleteCollegeTieUpService from "../../services/collegeTieUpServices/deleteCollege.service.js";

const deleteCollegeTieUpController = async (req, res) => {
  try {
    const college = await deleteCollegeTieUpService(
      req.params.id
    );

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College tie-up not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "College tie-up deleted successfully.",
      data: college,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete college tie-up.",
    });
  }
};

export default deleteCollegeTieUpController;
