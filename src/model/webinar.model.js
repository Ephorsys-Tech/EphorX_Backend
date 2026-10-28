import mongoose from "mongoose";

const webinarSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["live", "pre-recorded"],
      required: true,
    },
    thumbnail: {
      type: String,
      default: null,
    },
    date: {
      type: Date,
      default: null,
    },
    startTime: {
      type: String,
      default: null,
    },
    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    availability: {
      type: String,
      enum: ["scheduled", "anytime", "completed"],
      default: "scheduled",
    },
    instructor: {
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
    },
    attendeeCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["draft", "published", "cancelled"],
      default: "draft",
    },
  },
  { timestamps: true }
);

const Webinar = mongoose.model("Webinar", webinarSchema);

export default Webinar;