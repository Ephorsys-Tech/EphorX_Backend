import mongoose from "mongoose";
import CourseEnrollment from "../../model/courseEnrollment.model.js";

export const deleteEnrollmentService = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid enrollment ID");
    error.statusCode = 400;
    throw error;
  }

  const deletedEnrollment = await CourseEnrollment.findByIdAndDelete(id);

  if (!deletedEnrollment) {
    const error = new Error("Enrollment not found");
    error.statusCode = 404;
    throw error;
  }

  return deletedEnrollment;
};