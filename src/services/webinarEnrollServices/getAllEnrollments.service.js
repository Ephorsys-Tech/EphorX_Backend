import WebinarEnrollment from "../../model/webinarEnrollment.model.js";

export const getAllEnrollmentsService = async () => {
  const enrollments = await WebinarEnrollment.find()
    .sort({ createdAt: -1 });

  return enrollments;
};