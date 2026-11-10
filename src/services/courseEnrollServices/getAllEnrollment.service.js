import CourseEnrollment from "../../model/courseEnrollment.model.js";

export const getAllEnrollmentsService = async () => {
  const enrollments = await CourseEnrollment.find()
    .sort({ createdAt: -1 });

  return enrollments;
};