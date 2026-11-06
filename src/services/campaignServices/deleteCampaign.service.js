
import Campaign from "../../model/campaign.model.js";
import cloudinary from "../../config/cloudinary.js";

const deleteCampaignService = async (id) => { 
  const campaign = await Campaign.findById(id);

  if (!campaign) return null;

  await Campaign.findByIdAndDelete(id);

  if (campaign.publicId) {
    await cloudinary.uploader
      .destroy(campaign.publicId, { resource_type: "image" })
      .catch((error) => {
        console.error("Campaign image cleanup failed:", error);
      });
  }

  return campaign;
};

export default deleteCampaignService;
