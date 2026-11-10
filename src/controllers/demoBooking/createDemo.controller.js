import { validationResult } from "express-validator";
import createDemoBooking from "../../services/demoBooking/createDemo.service.js";

const createDemoBookingController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const booking = await createDemoBooking(req.body);

    return res.status(201).json({
      success: true,
      message: "Demo session booked successfully",
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

export default createDemoBookingController;