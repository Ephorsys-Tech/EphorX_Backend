import WebinarEnrollment from "../../model/webinarEnrollment.model.js";
import mongoose from "mongoose";

export const deleteEnrollmentService = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid enrollment ID");
    error.statusCode = 400;
    throw error;
  }

  const deletedEnrollment = await WebinarEnrollment.findByIdAndDelete(id);

  if (!deletedEnrollment) {
    const error = new Error("Enrollment not found");
    error.statusCode = 404;
    throw error;
  }

  return deletedEnrollment;
};