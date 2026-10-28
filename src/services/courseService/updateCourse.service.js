
import Course from "../../model/course.model.js";
import cloudinary from "../../config/cloudinary.js";
import uploadCourseFiles from "./uploadCourseFiles.service.js";

const updateCourseService = async (id, data, image, syllabus) => {
  // Find the existing course
  const existingCourse = await Course.findById(id);

  if (!existingCourse) {
    return null;
  }

  const updateData = {};

  // Update title
  if (data.title !== undefined) {
    updateData.title = data.title.trim();
  }

  // Update description
  if (data.description !== undefined) {
    updateData.description = data.description.trim();
  }

  // Update course type
  if (data.type !== undefined) {
    updateData.type = data.type.trim();
  }

  // Update original price (matches Course model capitalization)
  if (data.Originalprice !== undefined) {
    updateData.Originalprice = data.Originalprice.trim();
  }

  // Update discounted price
  if (data.discountPrice !== undefined) {
    updateData.discountPrice = data.discountPrice.trim();
  }

  // Update duration
  if (data.duration !== undefined) {
    updateData.duration = data.duration.trim();
  }

  // Update category
  if (data.categoryId !== undefined) {
    updateData.categoryId = data.categoryId;
  }

  // Upload only the files provided in this request
  const uploadedFiles = await uploadCourseFiles(image, syllabus);

  // Update image fields when a new image is uploaded
  if (uploadedFiles.image) {
    updateData.imageUrl = uploadedFiles.image.url;
    updateData.imagePublicId = uploadedFiles.image.publicId;
  }

  // Update syllabus fields when a new syllabus is uploaded
  if (uploadedFiles.syllabus) {
    updateData.syllabusUrl = uploadedFiles.syllabus.url;
    updateData.syllabusPublicId = uploadedFiles.syllabus.publicId;
  }

  // Save changes and return the updated course
  const updatedCourse = await Course.findByIdAndUpdate(
    id,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    }
  );

  // Delete old Cloudinary files after the database update succeeds
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
        // Cleanup failure should not undo a successful database update
        console.error(
          "Old Cloudinary file cleanup failed:",
          error
        );
      }
    }
  }

  if (!updatedCourse) {
  return null;
}

return {
  _id: updatedCourse._id,
  title: updatedCourse.title,
  description: updatedCourse.description,
  type: updatedCourse.type,
  categoryId: updatedCourse.categoryId,
  imageUrl: updatedCourse.imageUrl,
  imagePublicId: updatedCourse.imagePublicId,
  syllabusUrl: updatedCourse.syllabusUrl,
  syllabusPublicId: updatedCourse.syllabusPublicId,
  Originalprice: updatedCourse.Originalprice,
  discountPrice: updatedCourse.discountPrice,
  duration: updatedCourse.duration,
  createdAt: updatedCourse.createdAt,
  updatedAt: updatedCourse.updatedAt,
};
};

export default updateCourseService;
