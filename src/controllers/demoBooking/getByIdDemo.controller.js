import { validationResult } from "express-validator";
import getDemoBookingById from "../../services/demoBooking/getByIdDemo.service.js"


const getDemoBookingByIdController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const booking = await getDemoBookingById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Demo booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default getDemoBookingByIdController;