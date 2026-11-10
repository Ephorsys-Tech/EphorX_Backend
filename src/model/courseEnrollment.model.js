import mongoose from "mongoose";

const courseEnrollmentSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    whatsappNumber: {
      type: String,
      required: true,
      trim: true,
    },

    profession: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent the same email from enrolling in the same course twice
courseEnrollmentSchema.index(
  { courseId: 1, email: 1 },
  { unique: true }
);

const CourseEnrollment = mongoose.model(
  "CourseEnrollment",
  courseEnrollmentSchema
);

export default CourseEnrollment;