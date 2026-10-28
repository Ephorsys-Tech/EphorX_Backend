import Course from "../../model/course.model.js";

const getAllCoursesService = async () => {
  const courses = await Course.find().sort({ createdAt: -1 }).lean();

  return courses;
};

export default getAllCoursesService;
