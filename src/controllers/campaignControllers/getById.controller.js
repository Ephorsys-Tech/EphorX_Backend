
import getCampaignByIdService from "../../services/campaignServices/getCampaignById.service.js";

const getCampaignByIdController = async (req, res) => {
  try {
    const campaign = await getCampaignByIdService(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: campaign,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch campaign.",
    });
  }
};

export default getCampaignByIdController;
