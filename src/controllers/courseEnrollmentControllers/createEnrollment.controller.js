import { createEnrollmentService } from "../../services/courseEnrollServices/createEnrollment.service.js";


export const createEnrollmentController = async (req, res, next) => {
  try {
    const enrollment = await createEnrollmentService(req.body);

    return res.status(201).json({
      success: true,
      message: "Course enrollment successful",
      data: enrollment,
    });
  } catch (error) {
    next(error);
  }
};
