
import cloudinary from "../../config/cloudinary.js";

const uploadCourseFile = (file, resourceType) => {
  return new Promise((resolve, reject) => {
    const isPdf = resourceType === "raw";

    const options = {
      resource_type: resourceType,
      folder: "courses",
    };

    if (isPdf) {
      const fileName = (file.originalname || "syllabus.pdf")
        .replace(/\.pdf$/i, "")
        .replace(/[^a-zA-Z0-9_-]/g, "_");

      options.public_id = `${Date.now()}-${fileName}.pdf`;
    }

   const uploadStream = cloudinary.uploader.upload_stream(
  options,
  (error, result) => {
    if (error) {
      console.error("CLOUDINARY ERROR:", error);
      return reject(error);
    }

    console.log("CLOUDINARY UPLOAD SUCCESS");
    console.log("URL:", result.secure_url);
    console.log("Resource type:", result.resource_type);
    console.log("Format:", result.format);

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
    if (syllabus.mimetype !== "application/pdf") {
      throw new Error("Syllabus must be a PDF file.");
    }

    uploadedFiles.syllabus = await uploadCourseFile(syllabus, "raw");
  }

  return uploadedFiles;
};

export default uploadCourseFiles;
