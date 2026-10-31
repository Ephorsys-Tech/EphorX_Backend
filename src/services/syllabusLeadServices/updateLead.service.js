import Course from "../../model/course.model.js"
import SyllabusLead from "../../model/syllabusLead.model.js"

const updateSyllabusLead = async (id, data) => {
  const updateData = {
    ...data,
  };

  if (data.courseId) {
    const course = await Course.findById(data.courseId);

    if (!course) {
      throw new Error("Selected course not found");
    }

    updateData.courseId = course._id.toString();
    updateData.courseName = course.title;
    updateData.syllabusUrl = course.syllabusUrl;
  }

  const updatedDownload = await SyllabusLead.findByIdAndUpdate(
    id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedDownload;
};

export default updateSyllabusLead;