
import Campaign from "../../model/campaign.model.js";

const getAllCampaignsService = async () => {
  return await Campaign.find().sort({ createdAt: -1 });
};

export default getAllCampaignsService;
