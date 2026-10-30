
import mongoose from "mongoose"

const webinarEnrollmentSchema = new mongoose.Schema(
  {
    webinarId: {
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

webinarEnrollmentSchema.index(
  { webinarId: 1, email: 1 },
  { unique: true }
);

const WebinarEnrollment = mongoose.model(
  "WebinarEnrollment",
  webinarEnrollmentSchema
);

export default WebinarEnrollment
