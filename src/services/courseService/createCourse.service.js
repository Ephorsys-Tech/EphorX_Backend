
import Course from "../../model/course.model.js";
import UploadCourseFiles from "./uploadCourseFiles.service.js";

const createCourseService = async (courseData, image, syllabus) => {
  const {
    title,
    description,
    type,
    Originalprice,
    discountPrice,
    duration,
    categoryId,
  } = courseData;

  // Validate required fields before calling .trim()
  const requiredFields = {
    title,
    description,
    type,
    Originalprice,
    discountPrice,
    duration,
    categoryId,
  };

  for (const [field, value] of Object.entries(requiredFields)) {
    if (value === undefined || value === null || value === "") {
      throw new Error(`Missing required course field: ${field}`);
    }
  }

  // Validate string fields
  const stringFields = {
    title,
    description,
    type,
    Originalprice,
    discountPrice,
    duration,
  };

  for (const [field, value] of Object.entries(stringFields)) {
    if (typeof value !== "string" || !value.trim()) {
      throw new Error(`${field} must be a non-empty string.`);
    }
  }

  const uploadedFiles = await UploadCourseFiles(image, syllabus);

  const course = await Course.create({
  title: title.trim(),
  description: description.trim(),
  type: type.trim(),
  categoryId,
  imageUrl: uploadedFiles.image?.url || "",
  imagePublicId: uploadedFiles.image?.publicId || "",
  syllabusUrl: uploadedFiles.syllabus?.url || "",
  syllabusPublicId: uploadedFiles.syllabus?.publicId || "",
  Originalprice: Originalprice.trim(),
  discountPrice: discountPrice.trim(),
  duration: duration.trim(),
});

  return course;
};

export default createCourseService;
