
import mongoose from "mongoose";

const trainerIdValidator = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid trainer ID",
    });
  }

  next();
};

export default trainerIdValidator;
