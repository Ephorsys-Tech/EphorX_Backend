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
        if (error) {
          return reject(error);
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    Readable.from(file.buffer).pipe(uploadStream);
  });
};

const updateCollegeTieUpService = async (id, data, file) => {
  const college = await CollegeTieUp.findById(id);

  if (!college) {
    return null;
  }

  let newUploadedLogo = null;
  const oldPublicId = college.publicId;

  try {
    // Upload new logo only if a file is provided
    if (file) {
      newUploadedLogo = await uploadCollegeLogo(file);

      college.collegeLogo = newUploadedLogo.url;
      college.publicId = newUploadedLogo.publicId;
    }

    // Update college name if provided
    if (data.collegeName !== undefined) {
      college.collegeName = data.collegeName.trim();
    }

    await college.save();

    // Delete old logo only after successful database update
    if (newUploadedLogo && oldPublicId) {
      try {
        await cloudinary.uploader.destroy(oldPublicId, {
          resource_type: "image",
        });
      } catch (cleanupError) {
        console.error(
          "Old Cloudinary logo cleanup failed:",
          cleanupError
        );
      }
    }

    return college;
  } catch (error) {
    // Delete newly uploaded logo if database update fails
    if (newUploadedLogo?.publicId) {
      await cloudinary.uploader
        .destroy(newUploadedLogo.publicId, {
          resource_type: "image",
        })
        .catch((cleanupError) => {
          console.error(
            "New Cloudinary logo cleanup failed:",
            cleanupError
          );
        });
    }

    throw error;
  }
};

export default updateCollegeTieUpService;