
import getActiveCampaignsService from "../../services/campaignServices/getActiveCampaign.service.js";

const getActiveCampaignsController = async (req, res) => {
  try {
    const campaigns = await getActiveCampaignsService();

    return res.status(200).json({
      success: true,
      count: campaigns.length,
      data: campaigns,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch active campaigns.",
    });
  }
};

export default getActiveCampaignsController;
