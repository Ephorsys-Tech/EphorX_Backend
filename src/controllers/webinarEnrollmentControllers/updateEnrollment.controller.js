import { updateEnrollmentService } from "../../services/webinarEnrollServices/updateEnrollment.service.js";


export const updateEnrollmentController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedEnrollment = await updateEnrollmentService(
      id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Enrollment updated successfully",
      data: updatedEnrollment,
    });
  } catch (error) {
    next(error);
  }
};
