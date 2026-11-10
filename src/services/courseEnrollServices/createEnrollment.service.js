import CourseEnrollment from "../../model/courseEnrollment.model.js";


export const createEnrollmentService = async (enrollmentData) => {
  const { webinarId, email } = enrollmentData;

  const existingEnrollment = await CourseEnrollment.findOne({
    webinarId,
    email,
  });

  if (existingEnrollment) {
    return {
      alreadyEnrolled: true,
      enrollment: existingEnrollment,
    };
  }

  const enrollment = await CourseEnrollment.create(enrollmentData);

  return {
    alreadyEnrolled: false,
    enrollment,
  };
};
