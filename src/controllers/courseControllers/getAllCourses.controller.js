import getAllCoursesService from "../../services/courseService/getAllCourses.service.js";


const getAllCourses = async (req, res) => {
  try {
    const courses = await getAllCoursesService();

    return res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    console.error("Get all courses error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export default getAllCourses;
