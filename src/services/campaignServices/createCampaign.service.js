import Campaign from "../../model/campaign.model.js";
import cloudinary from "../../config/cloudinary.js";
import { Readable } from "stream";

const createCampaignService = async (data, file) => {
  let uploadedImage;

  try {
    // Check for duplicate campaign before uploading image
    const existingCampaign = await Campaign.findOne({
      title: {
        $regex: `^${data.title.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
        $options: "i",
      },
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    });

    if (existingCampaign) {
      throw new Error(
        "A campaign with the same title and dates already exists."
      );
    }

    // Upload image to Cloudinary
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

    const campaign = await Campaign.create({
      title: data.title.trim(),
      description: data.description.trim(),
      campaignImage: uploadedImage.url,
      publicId: uploadedImage.publicId,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      isActive:
        data.isActive === undefined
          ? true
          : data.isActive === "true" || data.isActive === true,
    });

    return campaign;
  } catch (error) {
    if (uploadedImage?.publicId) {
      await cloudinary.uploader
        .destroy(uploadedImage.publicId, { resource_type: "image" })
        .catch(console.error);
    }

    throw error;
  }
};

export default createCampaignService;