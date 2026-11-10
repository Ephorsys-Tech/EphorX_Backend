
import Campaign from "../../model/campaign.model.js";

const getCampaignByIdService = async (id) => {
  return await Campaign.findById(id);
};

export default getCampaignByIdService;
