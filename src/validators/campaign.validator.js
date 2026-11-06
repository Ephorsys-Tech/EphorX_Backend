
import mongoose from "mongoose";

export const campaignIdValidator = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid campaign ID.",
    });
  }

  next();
};

export const createCampaignValidator = (req, res, next) => {
  const { title, description, startDate, endDate } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Campaign title is required.",
    });
  }

  if (!description || !description.trim()) {
    return res.status(400).json({
      success: false,
      message: "Campaign description is required.",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Campaign image is required.",
    });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (
    !startDate ||
    !endDate ||
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime())
  ) {
    return res.status(400).json({
      success: false,
      message: "Valid campaign start and end dates are required.",
    });
  }

  if (end <= start) {
    return res.status(400).json({
      success: false,
      message: "End date must be later than start date.",
    });
  }

  next();
};

export const updateCampaignValidator = (req, res, next) => {
  const { title, description, startDate, endDate, isActive } = req.body;

  if (
    title === undefined &&
    description === undefined &&
    startDate === undefined &&
    endDate === undefined &&
    isActive === undefined &&
    !req.file
  ) {
    return res.status(400).json({
      success: false,
      message: "Provide at least one field to update.",
    });
  }

  if (title !== undefined && !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Campaign title cannot be empty.",
    });
  }

  if (description !== undefined && !description.trim()) {
    return res.status(400).json({
      success: false,
      message: "Campaign description cannot be empty.",
    });
  }

  if (startDate !== undefined && Number.isNaN(new Date(startDate).getTime())) {
    return res.status(400).json({
      success: false,
      message: "Invalid campaign start date.",
    });
  }

  if (endDate !== undefined && Number.isNaN(new Date(endDate).getTime())) {
    return res.status(400).json({
      success: false,
      message: "Invalid campaign end date.",
    });
  }

  if (isActive !== undefined && !["true", "false", true, false].includes(isActive)) {
    return res.status(400).json({
      success: false,
      message: "isActive must be true or false.",
    });
  }

  next();
};
