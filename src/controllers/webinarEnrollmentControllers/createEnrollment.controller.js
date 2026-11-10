import { createEnrollmentService } from "../../services/webinarEnrollServices/createEnrollment.service.js";


export const createEnrollmentController = async (req, res, next) => {
  try {
    const enrollment = await createEnrollmentService(req.body);

    return res.status(201).json({
      success: true,
      message: "Webinar enrollment successful",
      data: enrollment,
    });
  } catch (error) {
    next(error);
  }
};
