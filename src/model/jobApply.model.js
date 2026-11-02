import mongoose from "mongoose";

const jobApplySchema = new mongoose.Schema(
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

    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    resume: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const JobApply = mongoose.model(
  "JobApply",
  jobApplySchema
);

export default JobApply;