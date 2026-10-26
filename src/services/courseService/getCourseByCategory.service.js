
import Course from "../../model/course.model.js";

const getCoursesByCategoryService = async (categoryId) => {
  const courses = await Course.find({ categoryId })
    .sort({ createdAt: -1 })
    .lean();

  return courses;
};

export default getCoursesByCategoryService;
