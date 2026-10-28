import { createWebinarService } from "../../services/webinarServices/createWebinar.service.js";

export const createWebinar = async (req, res) => {
  try {
    const webinar = await createWebinarService(req.body);

    return res.status(201).json({
      success: true,
      message: "Webinar created successfully",
      data: webinar,
    });
  } catch (error) {
    console.error("Create webinar error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create webinar",
    });
  }
};