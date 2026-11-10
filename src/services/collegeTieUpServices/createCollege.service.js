import CollegeTieUp from "../../model/collegeTieUpModel.js";
import cloudinary from "../../config/cloudinary.js";
import { Readable } from "stream";

const uploadCollegeLogo = async (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "college-tie-ups",
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    Readable.from(file.buffer).pipe(uploadStream);
  });
};

const createCollegeTieUpService = async (collegeName, file) => {
  let uploadedLogo = null;

  try {
    const trimmedName = collegeName.trim();

    // Check if college already exists (case-insensitive)
    const existingCollege = await CollegeTieUp.findOne({
      collegeName: trimmedName,
    }).collation({ locale: "en", strength: 2 });

    if (existingCollege) {
      const error = new Error("This college already exists.");
      error.statusCode = 409;
      throw error;
    }

    uploadedLogo = await uploadCollegeLogo(file);

    const college = await CollegeTieUp.create({
      collegeName: trimmedName,
      collegeLogo: uploadedLogo.url,
      publicId: uploadedLogo.publicId,
    });

    return college;
  } catch (error) {
    // Clean up uploaded logo if database creation fails
    if (uploadedLogo?.publicId) {
      await cloudinary.uploader.destroy(uploadedLogo.publicId, {
        resource_type: "image",
      }).catch(console.error);
    }

    // Handle duplicate requests arriving simultaneously
    if (error.code === 11000) {
      const duplicateError = new Error("This college already exists.");
      duplicateError.statusCode = 409;
      throw duplicateError;
    }

    throw error;
  }
};

export default createCollegeTieUpService;