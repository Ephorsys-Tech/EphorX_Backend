
import mongoose from "mongoose";
import Category from "../../model/category.model.js";

const getCategoryByIdValidator = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID.",
      });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    next();
  } catch (error) {
    console.error("Get category validation error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export default getCategoryByIdValidator;
