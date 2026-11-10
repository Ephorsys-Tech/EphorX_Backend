import Course from "../../model/course.model.js";
import DemoBooking from "../../model/demoBooking.model.js";

const updateDemoBooking = async (id, data) => {
  const allowedFields = [
    "fullName",
    "email",
    "phoneNumber",
    "whatsappNumber",
    "qualification",
  ];

  const updateData = {};

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  });

  if (data.courseId !== undefined) {
    const course = await Course.findById(data.courseId);

    if (!course) {
      throw new Error("Selected course not found");
    }

    updateData.courseId = course._id.toString();
    updateData.courseName = course.title;
  }

  return await DemoBooking.findByIdAndUpdate(
    id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};

export default updateDemoBooking;