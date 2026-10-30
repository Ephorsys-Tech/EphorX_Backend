import { getAllEnrollmentsService } from "../../services/courseEnrollServices/getAllEnrollment.service.js";

export const getAllEnrollmentsController = async (req, res, next) => {
  try {
    const enrollments = await getAllEnrollmentsService();

    return res.status(200).json({
      success: true,
      message: "Enrollments fetched successfully",
      data: enrollments,
    });
  } catch (error) {
    next(error);
  }
};