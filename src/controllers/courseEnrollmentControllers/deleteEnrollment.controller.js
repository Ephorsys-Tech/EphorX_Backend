import { deleteEnrollmentService } from "../../services/courseEnrollServices/deleteEnrollment.service.js";

export const deleteEnrollmentController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedEnrollment = await deleteEnrollmentService(id);

    return res.status(200).json({
      success: true,
      message: "Enrollment deleted successfully",
      data: deletedEnrollment,
    });
  } catch (error) {
    next(error);
  }
};