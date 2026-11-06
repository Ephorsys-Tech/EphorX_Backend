
import Campaign from "../../model/campaign.model.js";

const getActiveCampaignsService = async () => {
  const now = new Date();

  return await Campaign.find({
    isActive: true,
    startDate: { $lte: now },
    endDate: { $gt: now },
  }).sort({ createdAt: -1 });
};

export default getActiveCampaignsService;
