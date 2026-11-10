
import mongoose from "mongoose";
import Course from "../model/course.model.js";
import Category from "../model/category.model.js";

const updateCourseValidator = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      type,
      Originalprice,
      discountPrice,
      duration,
      categoryId,
    } = req.body;

    // Validate course ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID.",
      });
    }

    // Check whether course exists
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    // Check whether at least one field or file was provided
    const hasImage = (req.files?.image?.length ?? 0) > 0;
    const hasSyllabus = (req.files?.syllabus?.length ?? 0) > 0;

    if (
      title === undefined &&
      description === undefined &&
      type === undefined &&
      categoryId === undefined &&
      Originalprice === undefined &&
      discountPrice === undefined &&
      duration === undefined &&
      !hasImage &&
      !hasSyllabus
    ) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one field to update.",
      });
    }

    // Validate title
    if (title !== undefined) {
      if (
        typeof title !== "string" ||
        !title.trim() ||
        title.trim().length > 150
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Title must be a non-empty string of at most 150 characters.",
        });
      }

      // Prevent duplicate course titles
      const existingCourse = await Course.findOne({
        title: title.trim(),
        _id: { $ne: id },
      });

      if (existingCourse) {
        return res.status(409).json({
          success: false,
          message: "Another course with this title already exists.",
        });
      }
    }

    // Validate description
    if (description !== undefined) {
      if (
        typeof description !== "string" ||
        !description.trim() ||
        description.trim().length > 200
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Description must be a non-empty string of at most 200 characters.",
        });
      }
    }

    // Validate type
    if (type !== undefined) {
      if (
        typeof type !== "string" ||
        !type.trim() ||
        type.trim().length > 50
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Type must be a non-empty string of at most 50 characters.",
        });
      }
    }

    // Validate original price
    if (Originalprice !== undefined) {
      if (
        typeof Originalprice !== "string" ||
        !Originalprice.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Originalprice must be a non-empty string.",
        });
      }
    }

    // Validate discount price
    if (discountPrice !== undefined) {
      if (
        typeof discountPrice !== "string" ||
        !discountPrice.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Discount price must be a non-empty string.",
        });
      }
    }

    // Validate duration
    if (duration !== undefined) {
      if (
        typeof duration !== "string" ||
        !duration.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "Duration must be a non-empty string.",
        });
      }
    }

    // Validate category ID
    if (categoryId !== undefined) {
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
    }

    next();
  } catch (error) {
    console.error("Update course validation error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export default updateCourseValidator;
