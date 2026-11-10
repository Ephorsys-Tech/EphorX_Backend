
import express from "express";

 import campaignUpload from "../middleware/uploadCampaignImage.middleware.js";

import {
  createCampaignValidator,
  updateCampaignValidator,
  campaignIdValidator,
} from "../validators/campaign.validator.js";

import createCampaignController from "../controllers/campaignControllers/create.controller.js";
import getAllCampaignsController from "../controllers/campaignControllers/getAll.controller.js";
import getCampaignByIdController from "../controllers/campaignControllers/getById.controller.js";
import getActiveCampaignsController from "../controllers/campaignControllers/getActive.controller.js";
import updateCampaignController from "../controllers/campaignControllers/update.controller.js";
import deleteCampaignController from "../controllers/campaignControllers/delete.controller.js";

const router = express.Router();

// PUBLIC: Get currently active campaigns
router.get("/active", getActiveCampaignsController);

// CREATE
router.post(
  "/create",
  campaignUpload,
  createCampaignValidator,
  createCampaignController
);

// GET ALL
router.get(
  "/get-all",
  getAllCampaignsController
);

// GET BY ID
router.get(
  "/get/:id",
  campaignIdValidator,
  getCampaignByIdController
);

// UPDATE
router.patch(
  "/update/:id",
  campaignIdValidator,
  campaignUpload,
  updateCampaignValidator,
  updateCampaignController
);

// DELETE
router.delete(
  "/delete/:id",
  campaignIdValidator,
  deleteCampaignController
);

export default router;
