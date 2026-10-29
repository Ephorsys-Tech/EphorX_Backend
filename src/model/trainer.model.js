
import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema(
  {
    // Always visible in the card footer
    name: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    avatar: {
      type: String,
      default: null,
    },
    avatarPublicId: {
      type: String,
      default: null,
    },

    // Shown in the hover section
    category: {
      type: String,
      required: true,
      trim: true,
    },

    specialization: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    experienceYears: {
      type: Number,
      required: true,
      min: 0,
    },

    detailsUrl: {
      type: String,
      default: null,
    },

    // Controls whether the card is displayed
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

const Trainer = mongoose.model("Trainer", trainerSchema);

export default Trainer;
