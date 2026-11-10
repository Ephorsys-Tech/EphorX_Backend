import DemoBooking from "../../model/demoBooking.model.js";

const getDemoBookingById = async (id) => {
  return await DemoBooking.findById(id);
};

export default getDemoBookingById;