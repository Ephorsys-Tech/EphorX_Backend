import getCourseByIdService from "../../services/courseService/getCourseById.service.js";

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await getCourseByIdService(id);

    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    console.error("Get course by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export default getCourseById;
