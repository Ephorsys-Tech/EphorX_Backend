import getWebinarByIdService from "../../services/webinarServices/getWebinarById.service.js";

const getWebinarByIdController = async (req, res) => {
  try {
    const webinar = await getWebinarByIdService(req.params.id);

    if (!webinar) {
      return res.status(404).json({
        success: false,
        message: "Webinar not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Webinar fetched successfully",
      data: webinar,
    });
  } catch (error) {
    console.error("Get webinar by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch webinar",
    });
  }
};

export default getWebinarByIdController;