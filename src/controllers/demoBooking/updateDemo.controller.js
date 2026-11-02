import { validationResult } from "express-validator";
import updateDemoBooking from "../../services/demoBooking/updateDemo.service.js";

const updateDemoBookingController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    console.log("Demo Booking ID:", req.params.id);
    console.log("Update Request Body:", req.body);

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
    console.error("Update Demo Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default updateDemoBookingController;