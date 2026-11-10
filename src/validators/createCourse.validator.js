
import mongoose from "mongoose";
import Course from "../model/course.model.js";
import Category from "../model/category.model.js";

const createCourseValidator = async (req, res, next) => {
  try {
    const { title, description, type, categoryId } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Course title is required.",
      });
    }

    if (
      !description ||
      typeof description !== "string" ||
      !description.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Course description is required.",
      });
    }

    if (!type || typeof type !== "string" || !type.trim()) {
      return res.status(400).json({
        success: false,
        message: "Course type is required.",
      });
    }

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required.",
      });
    }

    if (!mongoose.isValidObjectId(categoryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID.",
      });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    const existingCourse = await Course.findOne({
      title: title.trim(),
    });

    if (existingCourse) {
      return res.status(409).json({
        success: false,
        message: "Course with this title already exists.",
      });
    }

    next();
  } catch (error) {
    console.error("Create course validation error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export default createCourseValidator;
