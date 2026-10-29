
import createTrainerService from "../../services/trainerServices/createTrainer.service.js";
import cloudinary from "../../config/cloudinary.js";

const createTrainerController = async (req, res) => {
  try {
    const trainerData = {
      ...req.body,
      avatar: req.file?.path || null,
      avatarPublicId: req.file?.filename || null,
    };

    const trainer = await createTrainerService(trainerData);

    return res.status(201).json({
      success: true,
      message: "Trainer created successfully",
      data: trainer,
    });
  } catch (error) {
    console.error("Create trainer error:", error);

    // Delete the uploaded image if trainer creation fails
    if (req.file?.filename) {
      try {
        await cloudinary.uploader.destroy(req.file.filename);
      } catch (cleanupError) {
        console.error("Cloudinary cleanup error:", cleanupError);
      }
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create trainer",
    });
  }
};

export default createTrainerController;
