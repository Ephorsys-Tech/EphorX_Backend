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
    }
  },
  {
    timestamps: true,
  }
);

const Trainer = mongoose.model("Trainer", trainerSchema);

export default Trainer;
