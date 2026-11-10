import WebinarEnrollment from "../../model/webinarEnrollment.model.js";
import mongoose from "mongoose";

export const getEnrollmentByIdService = async (id) => {
  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid enrollment ID");
    error.statusCode = 400;
    throw error;
  }

  // Find enrollment
  const enrollment = await WebinarEnrollment.findById(id);

  if (!enrollment) {
    const error = new Error("Enrollment not found");
    error.statusCode = 404;
    throw error;
  }

  return enrollment;
};