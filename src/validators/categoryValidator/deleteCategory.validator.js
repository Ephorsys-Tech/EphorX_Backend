
import mongoose from "mongoose";
import Category from "../../model/category.model.js";
import Course from "../../model/course.model.js";

const deleteCategoryValidator = async (req, res, next) => {
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

    const existingCourse = await Course.findOne({
      categoryId: id,
    });

    if (existingCourse) {
      return res.status(409).json({
        success: false,
        message: "Cannot delete category because it contains courses.",
      });
    }

    next();
  } catch (error) {
    console.error("Delete category validation error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export default deleteCategoryValidator;
