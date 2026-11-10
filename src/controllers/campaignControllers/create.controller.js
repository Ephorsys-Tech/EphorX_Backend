
import createCampaignService from "../../services/campaignServices/createCampaign.service.js";

const createCampaignController = async (req, res) => {
  try {
    const campaign = await createCampaignService(req.body, req.file);

    return res.status(201).json({
      success: true,
      message: "Campaign created successfully.",
      data: campaign,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create campaign.",
    });
  }
};

export default createCampaignController;
