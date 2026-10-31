import mongoose from "mongoose";

const syllabusLeadSchema = new mongoose.Schema(
  {
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

    qualification: {
      type: String,
      required: true,
      trim: true,
    },

    courseId: {
      type: String,
      required: true,
      trim: true,
    },

    courseName: {
      type: String,
      required: true,
      trim: true,
    },

    syllabusUrl: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const SyllabusLead = mongoose.model(
  "syllabusLead",
  syllabusLeadSchema
);

export default SyllabusLead;