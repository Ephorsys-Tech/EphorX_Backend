import { getEnrollmentByIdService } from "../../services/courseEnrollServices/getEnrollmentById.service.js";

export const getEnrollmentByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const enrollment = await getEnrollmentByIdService(id);

    return res.status(200).json({
      success: true,
      message: "Enrollment fetched successfully",
      data: enrollment,
    });
  } catch (error) {
    next(error);
  }
};