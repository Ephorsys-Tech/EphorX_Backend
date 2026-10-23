import mongoose from "mongoose";
import Course from "../model/course.model.js";
import Category from "../model/category.model.js"

const updateCourseValidator = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, type , categoryId } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid course ID.",
      });
    }

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found.",
      });
    }

    // At least one field must be provided
    
const hasImage = (req.files?.image?.length ?? 0) > 0;
const hasSyllabus = (req.files?.syllabus?.length ?? 0) > 0;

if (
  title === undefined &&
  description === undefined &&
  type === undefined &&
  categoryId === undefined &&
  !hasImage &&
  !hasSyllabus
) {
  return res.status(400).json({
    success: false,
    message: "Provide at least one field to update.",
  });
}


    if (title !== undefined) {
      if (
        typeof title !== "string" ||
        !title.trim() ||
        title.trim().length > 150
      ) {
        return res.status(400).json({
          success: false,
          message: "Title must be a non-empty string of at most 150 characters.",
        });
      }

      const existingCourse = await Course.findOne({
        title: title.trim(),
        _id: { $ne: id }
      });

      if (existingCourse) {
        return res.status(409).json({
          success: false,
          message: "Another course with this title already exists.",
        });
      }
    }

    if (description !== undefined) {
      if (
        typeof description !== "string" ||
        !description.trim() ||
        description.trim().length > 200
      ) {
        return res.status(400).json({
          success: false,
          message: "Description must be a non-empty string of at most 200 characters.",
        });
      }
    }

    if (type !== undefined) {
      if (
        typeof type !== "string" ||
        !type.trim() ||
        type.trim().length > 50
      ) {
        return res.status(400).json({
          success: false,
          message: "Type must be a non-empty string of at most 50 characters.",
        });
      }
    }

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
