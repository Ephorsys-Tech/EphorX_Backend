import deleteCourseService from "../../services/courseService/deleteCourse.service.js";

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await deleteCourseService(id);

    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully.",
      course: deletedCourse,
    });
  } catch (error) {
    console.error("Delete course error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export default deleteCourse;
