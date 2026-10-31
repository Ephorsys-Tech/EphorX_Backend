import { validationResult } from "express-validator";
import deleteDemoBooking from "../../services/demoBooking/deleteDemo.service.js"

const deleteDemoBookingController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const booking = await deleteDemoBooking(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Demo booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Demo booking deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default deleteDemoBookingController;