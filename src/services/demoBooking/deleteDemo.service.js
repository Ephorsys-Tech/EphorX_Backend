import DemoBooking from "../../model/demoBooking.model.js";

const deleteDemoBooking = async (id) => {
  return await DemoBooking.findByIdAndDelete(id);
};

export default deleteDemoBooking;