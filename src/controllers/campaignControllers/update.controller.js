
import updateCampaignService from "../../services/campaignServices/updateCampaign.service.js";

const updateCampaignController = async (req, res) => {
  try {
    const campaign = await updateCampaignService(
      req.params.id,
      req.body,
      req.file
    );

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Campaign updated successfully.",
      data: campaign,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update campaign.",
    });
  }
};

export default updateCampaignController;
