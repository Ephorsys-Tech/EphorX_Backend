
import updateTrainer from "../../services/trainerServices/updateTrainer.service.js";
import cloudinary from "../../config/cloudinary.js";

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "trainers",
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(buffer);
  });
};

const updateTrainerController = async (req, res) => {
  let newPublicId = null;

  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // Convert experienceYears from form-data string to number
    if (updates.experienceYears !== undefined) {
      updates.experienceYears = Number(updates.experienceYears);

      if (
        !Number.isFinite(updates.experienceYears) ||
        updates.experienceYears < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Experience years must be a non-negative number",
        });
      }
    }

    // Upload a replacement avatar if provided
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);

      updates.avatar = result.secure_url;
      updates.avatarPublicId = result.public_id;
      newPublicId = result.public_id;
    }

    const trainer = await updateTrainer(id, updates);

    if (!trainer) {
      if (newPublicId) {
        await cloudinary.uploader.destroy(newPublicId).catch(() => {});
      }

      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    // Delete the previous image only after a successful update.
    // Requires the service to return the previous public ID.
    if (newPublicId && trainer.previousAvatarPublicId) {
      await cloudinary.uploader
        .destroy(trainer.previousAvatarPublicId)
        .catch((error) => {
          console.error("Old avatar cleanup error:", error);
        });
    }

    return res.status(200).json({
      success: true,
      message: "Trainer updated successfully",
      data: trainer,
    });
  } catch (error) {
    if (newPublicId) {
      await cloudinary.uploader.destroy(newPublicId).catch(() => {});
    }

    console.error("Update trainer error:", error);

    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update trainer",
    });
  }
};

export default updateTrainerController;
