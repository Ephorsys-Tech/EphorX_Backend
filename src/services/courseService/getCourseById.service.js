
import Course from "../../model/course.model.js";

const getCourseByIdService = async (id) => {
  const course = await Course.findById(id).lean();

  return course;
};

export default getCourseByIdService;
