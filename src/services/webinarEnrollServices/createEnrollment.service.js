import WebinarEnrollment from "../../model/webinarEnrollment.model.js";


export const createEnrollmentService = async (enrollmentData) => {
  const { webinarId, email } = enrollmentData;

  const existingEnrollment = await WebinarEnrollment.findOne({
    webinarId,
    email,
  });

  if (existingEnrollment) {
    return {
      alreadyEnrolled: true,
      enrollment: existingEnrollment,
    };
  }

  const enrollment = await WebinarEnrollment.create(enrollmentData);

  return {
    alreadyEnrolled: false,
    enrollment,
  };
};
