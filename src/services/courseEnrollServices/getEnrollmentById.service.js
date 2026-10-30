import mongoose from "mongoose";
import CourseEnrollment from "../../model/courseEnrollment.model.js";

export const getEnrollmentByIdService = async (id) => {
  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid enrollment ID");
    error.statusCode = 400;
    throw error;
  }

  // Find enrollment
  const enrollment = await CourseEnrollment.findById(id);

  if (!enrollment) {
    const error = new Error("Enrollment not found");
    error.statusCode = 404;
    throw error;
  }

  return enrollment;
};