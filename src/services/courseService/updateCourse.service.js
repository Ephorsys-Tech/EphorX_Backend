
import Course from "../../model/course.model.js";
import cloudinary from "../../config/cloudinary.js";
import uploadCourseFiles from "./uploadCourseFiles.service.js";

const updateCourseService = async (id, data, image, syllabus) => {
  const existingCourse = await Course.findById(id);

  if (!existingCourse) {
    return null;
  }

  const updateData = {};

  if (data.title !== undefined) {
    updateData.title = data.title.trim();
  }

  if (data.description !== undefined) {
    updateData.description = data.description.trim();
  }

  if (data.type !== undefined) {
    updateData.type = data.type.trim();
  }

  if (data.categoryId !== undefined) {
    updateData.categoryId = data.categoryId;
  }

  // Upload only the files provided in this request
  const uploadedFiles = await uploadCourseFiles(image, syllabus);

  if (uploadedFiles.image) {
    updateData.imageUrl = uploadedFiles.image.url;
    updateData.imagePublicId = uploadedFiles.image.publicId;
  }

  if (uploadedFiles.syllabus) {
    updateData.syllabusUrl = uploadedFiles.syllabus.url;
    updateData.syllabusPublicId = uploadedFiles.syllabus.publicId;
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true },
    {returnDocument: 'after'}
  );

  // Delete replaced Cloudinary files after the database update succeeds
  if (updatedCourse) {
    const oldFilesToDelete = [];

    if (uploadedFiles.image && existingCourse.imagePublicId) {
      oldFilesToDelete.push({
        publicId: existingCourse.imagePublicId,
        resourceType: "image",
      });
    }

    if (uploadedFiles.syllabus && existingCourse.syllabusPublicId) {
      oldFilesToDelete.push({
        publicId: existingCourse.syllabusPublicId,
        resourceType: "raw",
      });
    }

    for (const file of oldFilesToDelete) {
      try {
        await cloudinary.uploader.destroy(file.publicId, {
          resource_type: file.resourceType,
        });
      } catch (error) {
        console.error("Old Cloudinary file cleanup failed:", error);
      }
    }
  }

  return updatedCourse;
};

export default updateCourseService;
