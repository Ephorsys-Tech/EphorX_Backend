
import cloudinary from "../../config/cloudinary.js";

const uploadCourseFile = (file, resourceType) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType,
        folder: "courses",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    uploadStream.end(file.buffer);
  });
};

const uploadCourseFiles = async (image, syllabus) => {
  const uploadedFiles = {};

  if (image) {
    uploadedFiles.image = await uploadCourseFile(image, "image");
  }

  if (syllabus) {
    uploadedFiles.syllabus = await uploadCourseFile(syllabus, "raw");
  }

  return uploadedFiles;
};

export default uploadCourseFiles;
