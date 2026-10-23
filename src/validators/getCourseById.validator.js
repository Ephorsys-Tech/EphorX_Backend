import mongoose from "mongoose";
import Course from "../model/course.model.js";

const getCourseByIdValidator = async (req, res, next) => {
  try {
    const { id } = req.params;

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

    next();
  } catch (error) {
    console.error( error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export default getCourseByIdValidator;
