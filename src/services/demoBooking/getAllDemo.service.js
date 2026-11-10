import DemoBooking from "../../model/demoBooking.model.js";

const getAllDemoBookings = async () => {
  return await DemoBooking.find().sort({ createdAt: -1 });
};

export default getAllDemoBookings;