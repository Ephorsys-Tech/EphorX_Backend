
import Course from "../../model/course.model.js";

const deleteCourseService = async (id) => {
  const deletedCourse = await Course.findByIdAndDelete(id);

  return deletedCourse;
};

export default deleteCourseService;
