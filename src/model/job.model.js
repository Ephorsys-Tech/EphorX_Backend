import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    employmentType: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    jobDescription: {
      type: String,
      required: true,
      trim: true,
    },

    responsibilities: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => value.length > 0,
        message: "At least one responsibility is required",
      },
    },

    requirements: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => value.length > 0,
        message: "At least one requirement is required",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;