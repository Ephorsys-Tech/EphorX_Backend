
import cloudinary from "../../config/cloudinary.js";
import { createWebinarService } from "../../services/webinarServices/createWebinar.service.js";

const uploadImage = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "webinars",
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(buffer);
  });

export const createWebinar = async (req, res) => {
  const uploadedPublicIds = [];

  try {
    const webinarData = { ...req.body };

    // Convert instructor JSON text into an object.
    if (typeof webinarData.instructor === "string") {
      try {
        webinarData.instructor = JSON.parse(webinarData.instructor);
      } catch {
        return res.status(400).json({
          success: false,
          message: "Instructor must contain valid JSON",
        });
      }
    }

    // Multipart form-data values arrive as strings.
    if (webinarData.duration !== undefined) {
      webinarData.duration = Number(webinarData.duration);
    }

    if (webinarData.attendeeCount !== undefined) {
      webinarData.attendeeCount = Number(webinarData.attendeeCount);
    }

    // Upload webinar thumbnail.
    const thumbnailFile = req.files?.thumbnail?.[0];

    if (thumbnailFile) {
      const result = await uploadImage(thumbnailFile.buffer);
      uploadedPublicIds.push(result.public_id);

      webinarData.thumbnail = result.secure_url;
      webinarData.thumbnailPublicId = result.public_id;
    }

    // Upload instructor avatar.
    const instructorAvatarFile =
      req.files?.instructorAvatar?.[0];

    if (instructorAvatarFile) {
      const result = await uploadImage(
        instructorAvatarFile.buffer
      );
      uploadedPublicIds.push(result.public_id);

      webinarData.instructor = webinarData.instructor || {};
      webinarData.instructor.avatar = result.secure_url;
      webinarData.instructor.avatarPublicId =
        result.public_id;
    }

    const webinar = await createWebinarService(webinarData);

    return res.status(201).json({
      success: true,
      message: "Webinar created successfully",
      data: webinar,
    });
  } catch (error) {
    console.error("Create webinar error:", error);

    // Clean up images if database creation fails.
    await Promise.allSettled(
      uploadedPublicIds.map((publicId) =>
        cloudinary.uploader.destroy(publicId)
      )
    );

    if (
      error.name === "ValidationError" ||
      error.name === "CastError"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create webinar",
    });
  }
};
