import getAllDemoBookings from "../../services/demoBooking/getAllDemo.service.js"

const getAllDemoBookingsController = async (req, res) => {
  try {
    const bookings = await getAllDemoBookings();

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default getAllDemoBookingsController;