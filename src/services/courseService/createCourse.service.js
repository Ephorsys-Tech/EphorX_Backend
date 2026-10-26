import Course from "../../model/course.model.js";
import UploadCourseFiles from "./uploadCourseFiles.service.js"


const createCourseService = async ( courseData, image, syllabus) => {

  const{title, description, type, categoryId}=courseData

  const uploadedFiles = await UploadCourseFiles(image, syllabus);

  const course = await Course.create({
    ...courseData,
    title: title.trim(),
    description: description.trim(),
    type: type.trim(),
    categoryId,
    imageUrl: uploadedFiles.image?.url || "",
    imagePublicId: uploadedFiles.image?.publicId || "",
    syllabusUrl: uploadedFiles.syllabus?.url || "",
    syllabusPublicId: uploadedFiles.syllabus?.publicId || "",
  });

  return course;
};

export default createCourseService;
