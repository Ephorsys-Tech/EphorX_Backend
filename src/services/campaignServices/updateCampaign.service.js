
import Campaign from "../../model/campaign.model.js";
import cloudinary from "../../config/cloudinary.js";
import { Readable } from "stream";

const updateCampaignService = async (id, data, file) => {
  const campaign = await Campaign.findById(id);

  if (!campaign) return null;

  let uploadedImage = null;
  const oldPublicId = campaign.publicId;

  try {
    if (file) {
      uploadedImage = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "campaigns",
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

      campaign.campaignImage = uploadedImage.url;
      campaign.publicId = uploadedImage.publicId;
    }

    if (data.title !== undefined) {
      campaign.title = data.title.trim();
    }

    if (data.description !== undefined) {
      campaign.description = data.description.trim();
    }

    if (data.startDate !== undefined) {
      campaign.startDate = new Date(data.startDate);
    }

    if (data.endDate !== undefined) {
      campaign.endDate = new Date(data.endDate);
    }

    if (data.isActive !== undefined) {
      campaign.isActive =
        data.isActive === "true" || data.isActive === true;
    }

    if (campaign.endDate <= campaign.startDate) {
      throw new Error("End date must be later than start date.");
    }

    await campaign.save();

    // Delete old image only after the database update succeeds
    if (uploadedImage && oldPublicId) {
      await cloudinary.uploader
        .destroy(oldPublicId, { resource_type: "image" })
        .catch((error) => {
          console.error("Old campaign image cleanup failed:", error);
        });
    }

    return campaign;
  } catch (error) {
    // Remove newly uploaded image if update fails
    if (uploadedImage?.publicId) {
      await cloudinary.uploader
        .destroy(uploadedImage.publicId, { resource_type: "image" })
        .catch(console.error);
    }

    throw error;
  }
};

export default updateCampaignService;
