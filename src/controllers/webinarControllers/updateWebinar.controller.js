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

    // Parse instructor when it is sent as JSON in FormData.
    if (typeof req.body.instructor === "string") {
      try {
        req.body.instructor = JSON.parse(req.body.instructor);
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid instructor data",
        });
      }
    }

    // Convert numeric fields from multipart/form-data.
    if (req.body.duration !== undefined) {
      req.body.duration = Number(req.body.duration);
    }

    // Update only fields supported by your update service.
    const webinar = await updateWebinar(id, req.body, req.files || req.file);

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
