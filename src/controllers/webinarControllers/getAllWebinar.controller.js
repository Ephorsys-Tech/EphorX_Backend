import getAllWebinarService from "../../services/webinarServices/getAllWebinar.service.js";

const getAllWebinarsController = async (req, res) => {
  try {
    const webinars = await getAllWebinarService();

    return res.status(200).json({
      success: true,
      message: "Webinars fetched successfully",
      total: webinars.length,
      data: webinars,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch webinars",
    });
  }
};

export default getAllWebinarsController;