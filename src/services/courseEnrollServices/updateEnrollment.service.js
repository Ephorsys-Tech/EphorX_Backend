import mongoose from "mongoose";
import CourseEnrollment from "../../model/courseEnrollment.model.js";

export const updateEnrollmentService = async (id, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid enrollment ID");
    error.statusCode = 400;
    throw error;
  }

  const enrollment = await CourseEnrollment.findById(id);

  if (!enrollment) {
    const error = new Error("Enrollment not found");
    error.statusCode = 404;
    throw error;
  }

  // Allow only these fields to be updated
  const allowedFields = [
    "fullName",
    "email",
    "phoneNumber",
    "whatsappNumber",
    "profession",
  ];

  const filteredData = {};

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  });

  // Check duplicate email
  if (filteredData.email) {
    const duplicate = await CourseEnrollment.findOne({
      courseId: enrollment.courseId,
      email: filteredData.email.toLowerCase(),
      _id: { $ne: id },
    });

    if (duplicate) {
      const error = new Error(
        "This email is already enrolled in this webinar"
      );
      error.statusCode = 409;
      throw error;
    }
  }

  const updatedEnrollment = await CourseEnrollment.findByIdAndUpdate(
    id,
    { $set: filteredData },
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedEnrollment;
};
