import deleteWebinarService from "../../services/webinarServices/deleteWebinar.service.js";

const deleteWebinarController = async (req, res) => {
  try {
    const { id } = req.params;

    const webinar = await deleteWebinarService(id);

    if (!webinar) {
      return res.status(404).json({
        success: false,
        message: "Webinar not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Webinar deleted successfully",
      data: webinar,
    });
  } catch (error) {
    console.error("Delete webinar error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete webinar",
    });
  }
};

export default deleteWebinarController;