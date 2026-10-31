import Course from "../../model/course.model.js"
import DemoBooking from "../../model/demoBooking.model.js"

const createDemoBooking = async (data) => {
  const course = await Course.findById(data.courseId);

  if (!course) {
    throw new Error("Selected course not found");
  }

  return await DemoBooking.create({
    fullName: data.fullName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    whatsappNumber: data.whatsappNumber,
    qualification: data.qualification,
    courseId: course._id.toString(),
    courseName: course.title,
  });
};

export default createDemoBooking;