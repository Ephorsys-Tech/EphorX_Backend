import mongoose from "mongoose";

const webinarIdValidator = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid webinar ID",
    });
  }

  next();
};

export default webinarIdValidator;