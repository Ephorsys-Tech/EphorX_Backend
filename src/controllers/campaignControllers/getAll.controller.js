
import getAllCampaignsService from "../../services/campaignServices/getAllCampaign.service.js";

const getAllCampaignsController = async (req, res) => {
  try {
    const campaigns = await getAllCampaignsService();

    return res.status(200).json({
      success: true,
      count: campaigns.length,
      data: campaigns,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch campaigns.",
    });
  }
};

export default getAllCampaignsController;
