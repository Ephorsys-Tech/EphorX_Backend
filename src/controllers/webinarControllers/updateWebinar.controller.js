import mongoose from "mongoose";
import updateWebinar from "../../services/webinarServices/updateWebinar.service.js";

const updateWebinarController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid webinar ID",
      });
    }

    const webinar = await updateWebinar(id, req.body);

    if (!webinar) {
      return res.status(404).json({
        success: false,
        message: "Webinar not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Webinar updated successfully",
      data: webinar,
    });
  } catch (error) {
    console.error("Update webinar error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update webinar",
    });
  }
};

export default updateWebinarController;