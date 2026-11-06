
import deleteCampaignService from "../../services/campaignServices/deleteCampaign.service.js";

const deleteCampaignController = async (req, res) => {
  try {
    const campaign = await deleteCampaignService(req.params.id);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Campaign deleted successfully.",
      data: campaign,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete campaign.",
    });
  }
};

export default deleteCampaignController;
