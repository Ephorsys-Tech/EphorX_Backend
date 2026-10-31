import { validationResult } from "express-validator";
import updateDemoBooking from "../../services/demoBooking/updateDemo.service.js"

const updateDemoBookingController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const booking = await updateDemoBooking(
      req.params.id,
      req.body
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Demo booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Demo booking updated successfully",
      booking,
    });
  } catch (error) {
    const status = error.message === "Selected course not found" ? 404 : 500;

    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};

export default updateDemoBookingController;