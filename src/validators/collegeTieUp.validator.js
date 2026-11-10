import mongoose from "mongoose";

// Validate college creation
export const createCollegeTieUpValidator = (req, res, next) => {
  const { collegeName } = req.body;

  if (!collegeName || typeof collegeName !== "string" || !collegeName.trim()) {
    return res.status(400).json({
      success: false,
      message: "College name is required.",
    });
  }

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "College logo is required.",
    });
  }

  next();
};

// Validate college update
export const updateCollegeTieUpValidator = (req, res, next) => {
  const { collegeName } = req.body;

  if (
    collegeName === undefined &&
    !req.file
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide a college name or college logo to update.",
    });
  }

  if (
    collegeName !== undefined &&
    (typeof collegeName !== "string" || !collegeName.trim())
  ) {
    return res.status(400).json({
      success: false,
      message: "College name cannot be empty.",
    });
  }

  next();
};

// Validate MongoDB ID
export const collegeTieUpIdValidator = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid college tie-up ID.",
    });
  }

  next();
};