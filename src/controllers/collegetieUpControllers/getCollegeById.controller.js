import getCollegeTieUpByIdService from "../../services/collegeTieUpServices/getCollegeById.service.js";

const getCollegeTieUpByIdController = async (req, res) => {
  try {
    const college = await getCollegeTieUpByIdService(req.params.id);

    if (!college) {
      return res.status(404).json({
        success: false,
        message: "College tie-up not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "College tie-up fetched successfully.",
      data: college,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch college tie-up.",
    });
  }
};

export default getCollegeTieUpByIdController;