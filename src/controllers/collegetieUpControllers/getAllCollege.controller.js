
import getAllCollegeTieUpsService from "../../services/collegeTieUpServices/getAllCollege.service.js";

const getAllCollegeTieUpsController = async (req, res) => {
  try {
    const colleges = await getAllCollegeTieUpsService();

    return res.status(200).json({
      success: true,
      message: "College tie-ups fetched successfully.",
      count: colleges.length,
      data: colleges,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch college tie-ups.",
    });
  }
};

export default getAllCollegeTieUpsController;
