
import mongoose from "mongoose";

const collegeTieUpSchema = new mongoose.Schema(
  {
    collegeName: {
      type: String,
      required: true,
      trim: true,
      unique:true
    },

    collegeLogo: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CollegeTieUp = mongoose.model(
  "CollegeTieUp",
  collegeTieUpSchema
);

export default CollegeTieUp;
