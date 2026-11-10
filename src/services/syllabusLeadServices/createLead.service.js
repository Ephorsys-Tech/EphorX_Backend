import Course from "../../model/course.model.js"
import SyllabusLead from "../../model/syllabusLead.model.js";

const createSyllabusLead = async (data) => {
  const course = await Course.findById(data.courseId);

  if (!course) {
    throw new Error("Selected course not found");
  }

  if (!course.syllabusUrl) {
    throw new Error("Syllabus is not available for this course");
  }

  const download = await SyllabusLead.create({
    fullName: data.fullName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    whatsappNumber: data.whatsappNumber,
    qualification: data.qualification,
    courseId: course._id.toString(),
    courseName: course.title,
    syllabusUrl: course.syllabusUrl,
  });

  return {
    download,
    syllabusUrl: course.syllabusUrl,
  };
};

export default createSyllabusLead;