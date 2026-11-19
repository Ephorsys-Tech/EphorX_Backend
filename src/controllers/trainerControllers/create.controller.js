
import createTrainerService from "../../services/trainerServices/createTrainer.service.js";
import cloudinary from "../../config/cloudinary.js";
import { Readable } from "stream";

const createTrainerController = async (req, res) => {
  let uploadedImage;

  try {
    let avatar = null;
    let avatarPublicId = null;

    if (req.file) {
      uploadedImage = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "trainers",
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        Readable.from(req.file.buffer).pipe(uploadStream);
      });

      avatar = uploadedImage.secure_url;
      avatarPublicId = uploadedImage.public_id;
    }

    const trainerData = {
      ...req.body,
      avatar,
      avatarPublicId,
    };

    const trainer = await createTrainerService(trainerData);
   

    return res.status(201).json({
      success: true,
      message: "Trainer created successfully",
      data: trainer,
    });

  } catch (error) {
    console.error("Create trainer error:", error);

    if (uploadedImage?.public_id) {
      try {
        await cloudinary.uploader.destroy(uploadedImage.public_id);
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
