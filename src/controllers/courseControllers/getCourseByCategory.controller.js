import getCoursesByCategoryService from "../../services/courseService/getCourseByCategory.service.js";


const getCoursesByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const courses = await getCoursesByCategoryService(id);

    return res.status(200).json({
      success: true,
      categoryId: id,
      count: courses.length,
      courses,
    });
  } catch (error) {
    console.error("Get courses by category error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export default getCoursesByCategory;
